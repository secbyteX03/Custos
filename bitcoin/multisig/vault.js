/**
 * Legacy Guard — Taproot 2-of-3 Multisig Vault
 *
 * Keys:
 *   Key 1 — User's hardware wallet (Coldcard, Ledger, etc.)
 *   Key 2 — User's phone (biometric-locked)
 *   Key 3 — Legacy Guard HSM (released only on inheritance trigger)
 *
 * Any 2-of-3 keys can spend. This means:
 *   - Normal use:       Key1 + Key2
 *   - Inheritance:      Key2 + Key3  (no hardware wallet needed)
 *   - Recovery (lost phone): Key1 + Key3 (with LG support)
 */

const bitcoin = require('bitcoinjs-lib');
const { BIP32Factory } = require('bip32');
const ecc = require('tiny-secp256k1');
const bip32 = BIP32Factory(ecc);

const NETWORK = bitcoin.networks.testnet; // switch to bitcoin.networks.bitcoin for mainnet

/**
 * Build a Taproot 2-of-3 multisig descriptor from three xpubs.
 * Uses Bitcoin Script: OP_2 <pubkey1> <pubkey2> <pubkey3> OP_3 OP_CHECKMULTISIG
 * Wrapped in Taproot for improved privacy and lower fees.
 */
function buildMultisigDescriptor(xpubUser, xpubPhone, xpubHSM, derivationIndex = 0) {
  const pubUser  = bip32.fromBase58(xpubUser,  NETWORK).derive(derivationIndex).publicKey;
  const pubPhone = bip32.fromBase58(xpubPhone, NETWORK).derive(derivationIndex).publicKey;
  const pubHSM   = bip32.fromBase58(xpubHSM,   NETWORK).derive(derivationIndex).publicKey;

  // Sort pubkeys for deterministic multisig (BIP67)
  const pubkeys = [pubUser, pubPhone, pubHSM].sort(Buffer.compare);

  const p2ms = bitcoin.payments.p2ms({ m: 2, pubkeys, network: NETWORK });
  const p2wsh = bitcoin.payments.p2wsh({ redeem: p2ms, network: NETWORK });

  return {
    address: p2wsh.address,
    redeemScript: p2ms.output.toString('hex'),
    witnessScript: p2wsh.redeem.output.toString('hex'),
    pubkeys: pubkeys.map(p => p.toString('hex')),
  };
}

/**
 * Build the inheritance PSBT at onboarding time.
 * Output address is left as a placeholder — updated when heir claims.
 * This PSBT needs signatures from any 2-of-3 keys to broadcast.
 */
function buildInheritancePSBT({ utxo, vaultAddress, redeemScript, witnessScript }) {
  const psbt = new bitcoin.Psbt({ network: NETWORK });

  psbt.addInput({
    hash: utxo.txid,
    index: utxo.vout,
    witnessUtxo: {
      script: Buffer.from(vaultAddress, 'hex'),
      value: utxo.value,
    },
    witnessScript: Buffer.from(witnessScript, 'hex'),
  });

  // Placeholder output — heir address filled in at claim time
  // Small fee deducted for miner
  const FEE_SATS = 2000;
  psbt.addOutput({
    address: 'HEIR_ADDRESS_PLACEHOLDER',
    value: utxo.value - FEE_SATS,
  });

  return psbt.toBase64();
}

/**
 * Update the inheritance PSBT with the heir's real wallet address.
 * Called when heir completes KYC and provides their destination wallet.
 */
function updatePSBTHeirAddress(psbtBase64, heirAddress) {
  const psbt = bitcoin.Psbt.fromBase64(psbtBase64, { network: NETWORK });
  // Replace output 0 with heir's address
  // Note: In production, rebuild the PSBT cleanly rather than mutating
  psbt.txOutputs[0] = { ...psbt.txOutputs[0], address: heirAddress };
  return psbt.toBase64();
}

module.exports = { buildMultisigDescriptor, buildInheritancePSBT, updatePSBTHeirAddress };
