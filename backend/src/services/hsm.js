const { logger } = require('../utils/logger');

/**
 * Hardware Security Module interface.
 * In production: AWS CloudHSM or Nitro Enclave.
 * The private key material NEVER leaves the HSM.
 */
async function generateHSMKey(userId) {
  logger.info(`[HSM] Generating new key for user ${userId}`);
  // const AWS = require('aws-sdk');
  // const kms = new AWS.KMS();
  // const key = await kms.createKey({ KeyUsage: 'SIGN_VERIFY', KeySpec: 'ECC_SECG_P256K1' }).promise();
  // return key.KeyMetadata.KeyId;
  return `hsm-key-${userId}-${Date.now()}`; // stub
}

async function hsmCoSignPSBT({ hsmKeyId, psbtCipher, heirAddress }) {
  logger.info(`[HSM] Co-signing PSBT for key ${hsmKeyId}`);
  // 1. Decrypt psbtCipher using HSM-protected key
  // 2. Update PSBT output to heirAddress
  // 3. Sign with HSM key — signature happens inside HSM, key never exposed
  // 4. Return the signed PSBT hex
  // const bitcoin = require('bitcoinjs-lib');
  // const psbt = bitcoin.Psbt.fromBase64(decryptedPsbt);
  // psbt.updateOutput(0, { address: heirAddress });
  // ... sign ...
  return { txid: 'stub-txid-replace-with-real' };
}

module.exports = { generateHSMKey, hsmCoSignPSBT };
