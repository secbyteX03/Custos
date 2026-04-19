/**
 * Legacy Guard — PSBT Builder
 *
 * Constructs and manages Partially Signed Bitcoin Transactions
 * for the inheritance handover protocol.
 *
 * Flow:
 *   1. At onboarding: buildInheritancePSBT() → store ciphertext
 *   2. At claim time:  finalizeWithHeirAddress() → co-sign with HSM → broadcast
 */
const bitcoin = require('bitcoinjs-lib');
const { BIP32Factory } = require('bip32');
const ecc = require('tiny-secp256k1');
const bip32 = BIP32Factory(ecc);

function getNetwork() {
  return process.env.BITCOIN_NETWORK === 'mainnet'
    ? bitcoin.networks.bitcoin
    : bitcoin.networks.testnet;
}

/**
 * Build a bare PSBT at onboarding time.
 * The output address is a placeholder — updated when heir provides their wallet.
 *
 * @param {object} utxo - { txid, vout, value } — the vault UTXO to spend
 * @param {string} witnessScript - hex-encoded witness script from multisig setup
 * @param {number} feeSats - miner fee in satoshis
 */
function buildInheritancePSBT({ utxo, witnessScript, feeSats = 3000 }) {
  const network = getNetwork();
  const psbt = new bitcoin.Psbt({ network });

  const scriptBuffer = Buffer.from(witnessScript, 'hex');

  psbt.addInput({
    hash: utxo.txid,
    index: utxo.vout,
    witnessUtxo: {
      script: bitcoin.payments.p2wsh({ redeem: { output: scriptBuffer }, network }).output,
      value: utxo.value,
    },
    witnessScript: scriptBuffer,
  });

  // Placeholder output — will be replaced at claim time
  // We use a valid dummy address to satisfy PSBT validation
  const dummyAddress = network === bitcoin.networks.bitcoin
    ? '1BitcoinEaterAddressDontSendf59kuE' // mainnet burn address (placeholder)
    : 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'; // testnet

  psbt.addOutput({ address: dummyAddress, value: utxo.value - feeSats });
  return psbt.toBase64();
}

/**
 * Replace the placeholder output with the heir's real wallet address.
 * Also updates the fee based on current mempool (fetched externally).
 *
 * @param {string} psbtBase64 - the stored PSBT
 * @param {string} heirAddress - heir's destination Bitcoin address
 * @param {number} feeSats - updated fee (from fee estimator)
 */
function finalizeWithHeirAddress({ psbtBase64, heirAddress, feeSats = 3000 }) {
  const network = getNetwork();
  const psbt = bitcoin.Psbt.fromBase64(psbtBase64, { network });

  // Rebuild PSBT with heir address (cannot mutate outputs on an existing PSBT safely)
  const inputData = psbt.data.inputs[0];
  const inputTx = psbt.txInputs[0];
  const originalValue = inputData.witnessUtxo.value;

  const newPsbt = new bitcoin.Psbt({ network });
  newPsbt.addInput({
    hash: inputTx.hash,
    index: inputTx.index,
    witnessUtxo: inputData.witnessUtxo,
    witnessScript: inputData.witnessScript,
  });
  newPsbt.addOutput({ address: heirAddress, value: originalValue - feeSats });

  return newPsbt.toBase64();
}

/**
 * Combine two partial signatures into a final signed transaction.
 * Expects signatures from HSM key + heir key (2-of-3 satisfied).
 *
 * @param {string} psbtBase64 - PSBT with heir address set
 * @param {Buffer} sig1 - HSM signature (DER-encoded)
 * @param {Buffer} pubkey1 - HSM public key
 * @param {Buffer} sig2 - Heir signature
 * @param {Buffer} pubkey2 - Heir public key
 */
function combineAndExtract({ psbtBase64, sig1, pubkey1, sig2, pubkey2 }) {
  const network = getNetwork();
  const psbt = bitcoin.Psbt.fromBase64(psbtBase64, { network });

  psbt.addSignedDigest(0, pubkey1, sig1);
  psbt.addSignedDigest(0, pubkey2, sig2);
  psbt.finalizeAllInputs();

  return psbt.extractTransaction().toHex();
}

/**
 * Estimate fee for the inheritance transaction.
 * In production: query mempool.space API for current fee rates.
 */
async function estimateFee(targetBlocks = 6) {
  // const response = await fetch(`https://mempool.space/testnet/api/v1/fees/recommended`);
  // const { halfHourFee } = await response.json();
  // const txVBytes = 140; // approx for 1-input 1-output p2wsh
  // return halfHourFee * txVBytes;
  return 3000; // stub: 3000 sats default
}

module.exports = { buildInheritancePSBT, finalizeWithHeirAddress, combineAndExtract, estimateFee };
