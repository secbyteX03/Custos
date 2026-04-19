const { PrismaClient } = require('@prisma/client');
const { logger } = require('../utils/logger');
const prisma = new PrismaClient();

async function registerWatchtower({ userId, lndNodeUri, lndMacaroon }) {
  logger.info(`[Watchtower] Registering LND node for user ${userId}`);
  // Encrypt macaroon before storing
  const encryptedMacaroon = lndMacaroon; // TODO: encrypt with user-specific key
  await prisma.vault.update({
    where: { userId },
    data: { lndNodeUri, lndMacaroon: encryptedMacaroon },
  });
  // TODO: Subscribe to LND channel events via gRPC
  // const lnService = require('ln-service');
  return { registered: true };
}

async function getChannelStatus(userId) {
  const vault = await prisma.vault.findUnique({ where: { userId } });
  if (!vault?.lndNodeUri) return { status: 'NOT_CONFIGURED' };
  // TODO: Query LND for channel states
  return { status: 'ACTIVE', channels: [], threats: 0 };
}

module.exports = { registerWatchtower, getChannelStatus };
