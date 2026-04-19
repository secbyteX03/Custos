const { PrismaClient } = require('@prisma/client');
const { generateHSMKey } = require('./hsm');
const { logger } = require('../utils/logger');
const prisma = new PrismaClient();

async function setupMultisigVault({ userId, xpubUser, xpubPhone, heirPgpPublicKey, vaultType }) {
  logger.info(`[Vault] Setting up ${vaultType} vault for user ${userId}`);

  // Generate third key in HSM
  const hsmKeyId = await generateHSMKey(userId);

  // TODO: Derive multisig descriptor from xpubs + HSM pubkey
  // const descriptor = buildTaprootMultisigDescriptor(xpubUser, xpubPhone, hsmPubKey);

  // TODO: Build and store the inheritance PSBT (pre-signed, output address TBD)
  // const psbt = buildInheritancePSBT(descriptor);
  // const psbtCipher = pgpEncrypt(psbt.toBase64(), heirPgpPublicKey);

  const vault = await prisma.vault.upsert({
    where: { userId },
    create: {
      userId,
      vaultType,
      xpubUser,
      xpubPhone,
      hsmKeyId,
      inheritancePsbtCipher: 'stub-encrypted-psbt', // replace with real pgpCipher
    },
    update: { xpubUser, xpubPhone, hsmKeyId },
  });

  return vault;
}

module.exports = { setupMultisigVault };
