const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');
const { logger } = require('../../utils/logger');
const prisma = new PrismaClient();

// POST /api/switch/checkin — user taps "I'm here" + biometric
router.post('/checkin', authenticate, async (req, res, next) => {
  try {
    const { biometricToken } = req.body;
    // TODO: Verify biometricToken with web app attestation service
    const now = new Date();
    const sw = await prisma.deadMansSwitch.findUnique({
      where: { userId: req.user.userId },
    });
    if (!sw) return res.status(404).json({ error: 'Switch not configured' });
    if (sw.state === 'TRIGGERED' || sw.state === 'COMPLETE') {
      return res.status(400).json({ error: 'Switch already triggered, cannot check in' });
    }
    const nextDue = new Date(now.getTime() + sw.checkInIntervalDays * 86400000);
    await prisma.deadMansSwitch.update({
      where: { id: sw.id },
      data: {
        state: 'ACTIVE',
        lastCheckinAt: now,
        nextCheckinDue: nextDue,
        gracePeriodStartedAt: null,
        sarahNotifiedAt: null,
      },
    });
    logger.info(`[Switch] User ${req.user.userId} checked in. Next due: ${nextDue}`);
    res.json({ status: 'checked_in', nextDue });
  } catch (err) { next(err); }
});

// GET /api/switch/status
router.get('/status', authenticate, async (req, res, next) => {
  try {
    const sw = await prisma.deadMansSwitch.findUnique({
      where: { userId: req.user.userId },
    });
    res.json(sw || { state: 'NOT_CONFIGURED' });
  } catch (err) { next(err); }
});

// POST /api/switch/configure
router.post('/configure', authenticate, async (req, res, next) => {
  try {
    const { checkInIntervalDays = 90, gracePeriodDays = 30 } = req.body;
    const nextDue = new Date(Date.now() + checkInIntervalDays * 86400000);
    const sw = await prisma.deadMansSwitch.upsert({
      where: { userId: req.user.userId },
      create: {
        userId: req.user.userId,
        checkInIntervalDays,
        gracePeriodDays,
        nextCheckinDue: nextDue,
      },
      update: { checkInIntervalDays, gracePeriodDays, nextCheckinDue: nextDue },
    });
    res.json(sw);
  } catch (err) { next(err); }
});

module.exports = router;
