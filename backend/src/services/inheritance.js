const { PrismaClient } = require('@prisma/client');
const { logger } = require('../utils/logger');
const { sendLegacyPackage } = require('./notification');
const { hsmCoSignPSBT } = require('./hsm');
const { broadcastTransaction } = require('./bitcoin');
const prisma = new PrismaClient();

/**
 * Called by the scheduler when grace period expires.
 * Transitions state to TRIGGERED and kicks off heir KYC.
 */
async function triggerInheritanceProtocol(deadMansSwitch) {
  const { userId } = deadMansSwitch;
  logger.error(`[Inheritance] TRIGGERING protocol for user ${userId}`);

  await prisma.deadMansSwitch.update({
    where: { id: deadMansSwitch.id },
    data: { state: 'TRIGGERED', triggeredAt: new Date() },
  });

  // Get registered heirs
  const heirs = await prisma.heir.findMany({ where: { userId } });
  if (!heirs.length) {
    logger.error(`[Inheritance] No heirs registered for user ${userId}. Funds may be locked.`);
    return;
  }

  for (const heir of heirs) {
    // Generate a time-limited claim token
    const jwt = require('jsonwebtoken');
    const claimToken = jwt.sign(
      { heirId: heir.id, userId, scope: 'heir_claim' },
      process.env.JWT_HEIR_SECRET,
      { expiresIn: '72h' }
    );

    // Send encrypted legacy package to heir
    await sendLegacyPackage({ heir, userId, claimToken });

    await prisma.heir.update({
      where: { id: heir.id },
      data: { claimStatus: 'INITIATED', claimInitiatedAt: new Date() },
    });
  }
}

/**
 * Initiates KYC for the heir after they click the claim link.
 */
async function initiateHeirKYC({ claimToken, newWalletAddress }) {
  const jwt = require('jsonwebtoken');
  const decoded = jwt.verify(claimToken, process.env.JWT_HEIR_SECRET);
  const heir = await prisma.heir.findUnique({ where: { id: decoded.heirId } });

  if (!heir || heir.claimStatus !== 'INITIATED') {
    throw Object.assign(new Error('Invalid or expired claim'), { status: 400 });
  }

  await prisma.heir.update({
    where: { id: heir.id },
    data: { newWalletAddress, kycStatus: 'IN_PROGRESS' },
  });

  // TODO: Integrate with KYC provider (Smile Identity for Africa, Sumsub globally)
  // Return KYC session URL for the heir to complete verification
  const kycSessionUrl = `https://kyc-provider.com/session?heir=${heir.id}`;
  logger.info(`[Inheritance] KYC initiated for heir ${heir.id}`);
  return { kycSessionUrl };
}

/**
 * Called by KYC webhook after heir passes verification.
 * Co-signs the PSBT with HSM key and broadcasts to Bitcoin network.
 */
async function processHeirClaim({ heirId, kycSessionId }) {
  const heir = await prisma.heir.findUnique({
    where: { id: heirId },
    include: { user: { include: { vault: true } } },
  });

  // Verify KYC passed with provider
  // TODO: const kycResult = await kycProvider.verifySession(kycSessionId);

  await prisma.heir.update({
    where: { id: heirId },
    data: { kycStatus: 'PASSED', kycVerifiedAt: new Date() },
  });

  const vault = heir.user.vault;
  if (!vault?.inheritancePsbtCipher) {
    throw new Error('No inheritance PSBT found for this vault');
  }

  // Decrypt the pre-built PSBT and update output address to heir's wallet
  // Then get HSM to co-sign
  const { txid } = await hsmCoSignPSBT({
    hsmKeyId: vault.hsmKeyId,
    psbtCipher: vault.inheritancePsbtCipher,
    heirAddress: heir.newWalletAddress,
  });

  // Broadcast to Bitcoin network
  await broadcastTransaction(txid);

  await prisma.deadMansSwitch.update({
    where: { userId: heir.userId },
    data: { state: 'COMPLETE', completedAt: new Date(), txid },
  });
  await prisma.heir.update({
    where: { id: heirId },
    data: { claimStatus: 'COMPLETE', claimCompletedAt: new Date() },
  });

  logger.info(`[Inheritance] COMPLETE for heir ${heirId}. TXID: ${txid}`);
  return { txid };
}

module.exports = { triggerInheritanceProtocol, initiateHeirKYC, processHeirClaim };
