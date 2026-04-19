/**
 * PSBT Builder unit tests (runs against regtest)
 */
const { buildInheritancePSBT, finalizeWithHeirAddress } = require('../psbt/builder');

process.env.BITCOIN_NETWORK = 'testnet';

describe('PSBT Builder', () => {
  const mockUTXO = {
    txid: 'a'.repeat(64),
    vout: 0,
    value: 100000, // 0.001 BTC in sats
  };

  const mockWitnessScript =
    '5221' + // OP_2
    '02' + 'a'.repeat(64) + // pubkey1
    '02' + 'b'.repeat(64) + // pubkey2
    '02' + 'c'.repeat(64) + // pubkey3
    '53ae'; // OP_3 OP_CHECKMULTISIG

  test('builds a valid base64 PSBT', () => {
    const psbt = buildInheritancePSBT({
      utxo: mockUTXO,
      witnessScript: mockWitnessScript,
      feeSats: 3000,
    });
    expect(typeof psbt).toBe('string');
    expect(psbt.length).toBeGreaterThan(50);
  });

  test('finalizeWithHeirAddress produces a new PSBT', () => {
    const psbt = buildInheritancePSBT({
      utxo: mockUTXO,
      witnessScript: mockWitnessScript,
    });
    const heirPsbt = finalizeWithHeirAddress({
      psbtBase64: psbt,
      heirAddress: 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx',
    });
    expect(typeof heirPsbt).toBe('string');
    expect(heirPsbt).not.toEqual(psbt);
  });
});
