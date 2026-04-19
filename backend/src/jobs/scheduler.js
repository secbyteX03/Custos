const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const { logger } = require('../utils/logger');
const { sendMultiChannelAlert } = require('../services/notification');
const { triggerInheritanceProtocol } = require('../services/inheritance');

const prisma = new PrismaClient();

async function runSwitchCheck() {
  logger.info('[Scheduler] Running Dead Man Switch check...');
  const now = new Date();

  // Stage 1: ACTIVE → PENDING_WARNING
  const missed = await prisma.deadMansSwitch.findMany({
    where: { state: 'ACTIVE', nextCheckinDue: { lt: now } },
    include: { user: true },
  });
  for (const sw of missed) {
    await prisma.deadMansSwitch.update({ where: { id: sw.id }, data: { state: 'PENDING_WARNING' } });
    await sendMultiChannelAlert(sw.user, 'CHECKIN_REMINDER', { urgency: 'NORMAL' });
  }

  // Stage 2: PENDING_WARNING → GRACE_PERIOD (after 3 days)
  const warnings = await prisma.deadMansSwitch.findMany({
    where: { state: 'PENDING_WARNING' }, include: { user: true },
  });
  for (const sw of warnings) {
    const daysMissed = Math.floor((now - sw.nextCheckinDue) / 86400000);
    if (daysMissed >= 3) {
      await prisma.deadMansSwitch.update({
        where: { id: sw.id }, data: { state: 'GRACE_PERIOD', gracePeriodStartedAt: now },
      });
      await sendMultiChannelAlert(sw.user, 'GRACE_PERIOD_STARTED', { urgency: 'HIGH' });
    } else {
      await sendMultiChannelAlert(sw.user, 'CHECKIN_REMINDER', { urgency: 'HIGH' });
    }
  }

  // Stage 3: GRACE_PERIOD — escalate + trusted contact + trigger
  const grace = await prisma.deadMansSwitch.findMany({
    where: { state: 'GRACE_PERIOD' },
    include: { user: { include: { trustedContacts: true } } },
  });
  for (const sw of grace) {
    const elapsed = Math.floor((now - sw.gracePeriodStartedAt) / 86400000);
    const notifyAt = Math.floor(sw.gracePeriodDays * 0.66);
    if (elapsed >= notifyAt && !sw.sarahNotifiedAt) {
      for (const c of sw.user.trustedContacts) {
        await sendMultiChannelAlert(c, 'WELFARE_CHECK', { user: sw.user });
      }
      await prisma.deadMansSwitch.update({ where: { id: sw.id }, data: { sarahNotifiedAt: now } });
    }
    if (elapsed >= sw.gracePeriodDays) {
      await triggerInheritanceProtocol(sw);
    } else {
      const urgency = elapsed >= sw.gracePeriodDays - 7 ? 'CRITICAL' : 'HIGH';
      await sendMultiChannelAlert(sw.user, 'GRACE_PERIOD_WARNING', { urgency, daysLeft: sw.gracePeriodDays - elapsed });
    }
  }
  logger.info('[Scheduler] Switch check complete.');
}

function startScheduler() {
  cron.schedule('0 */6 * * *', runSwitchCheck);
  logger.info('[Scheduler] Dead Man Switch started — runs every 6 hours.');
}

module.exports = { startScheduler, runSwitchCheck };
