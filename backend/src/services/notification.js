const { logger } = require('../utils/logger');
// Pluggable: swap providers per region
// SMS: Twilio (global) or Africa's Talking (Africa)
// Email: SendGrid
// Push: Firebase FCM

async function sendMultiChannelAlert(user, template, data = {}) {
  const jobs = [];
  if (user.pushToken) jobs.push(sendPush(user.pushToken, template, data));
  if (user.phone)     jobs.push(sendSMS(user.phone, template, data));
  if (user.email)     jobs.push(sendEmail(user.email, template, data));
  await Promise.allSettled(jobs); // Never let one channel failure block others
}

async function sendPush(token, template, data) {
  logger.info(`[Push] Sending ${template} to ${token}`);
  // const admin = require('firebase-admin');
  // await admin.messaging().send({ token, notification: TEMPLATES[template](data) });
}

async function sendSMS(phone, template, data) {
  logger.info(`[SMS] Sending ${template} to ${phone}`);
  // Africa's Talking for African numbers, Twilio elsewhere
  // const africastalking = require('africastalking')({ apiKey, username });
  // await africastalking.SMS.send({ to: [phone], message: SMS_TEMPLATES[template](data) });
}

async function sendEmail(email, template, data) {
  logger.info(`[Email] Sending ${template} to ${email}`);
  // const sgMail = require('@sendgrid/mail');
  // await sgMail.send({ to: email, from: 'vault@legacyguard.app', ...EMAIL_TEMPLATES[template](data) });
}

async function sendLegacyPackage({ heir, userId, claimToken }) {
  logger.info(`[Legacy] Sending encrypted legacy package to heir ${heir.id}`);
  // 1. Build the legacy package JSON (exchange list, wallet paths, legal docs)
  // 2. PGP-encrypt it to heir.pgpPublicKey
  // 3. Send via email with claim link embedding claimToken
  const claimUrl = `${process.env.HEIR_PORTAL_URL}/claim?token=${claimToken}`;
  logger.info(`[Legacy] Claim URL generated: ${claimUrl}`);
  // await sendEmail(heir.email, 'LEGACY_PACKAGE', { claimUrl, heirName: heir.name });
}

module.exports = { sendMultiChannelAlert, sendLegacyPackage };
