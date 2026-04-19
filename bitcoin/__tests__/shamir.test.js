/**
 * Shamir Secret Sharing tests
 */
const { splitSeed, reconstructSeed, verifyShare } = require('../recovery/shamir');

describe('Shamir Secret Sharing', () => {
  const testSeed = 'a'.repeat(128); // 64-byte hex seed

  test('splits seed into N shares', () => {
    const shares = splitSeed(testSeed, 5, 3);
    expect(shares).toHaveLength(5);
    shares.forEach(s => expect(typeof s).toBe('string'));
  });

  test('reconstructs seed from threshold shares', () => {
    const shares = splitSeed(testSeed, 5, 3);
    const reconstructed = reconstructSeed(shares.slice(0, 3));
    expect(reconstructed).toBe(testSeed);
  });

  test('cannot reconstruct with fewer than threshold shares', () => {
    const shares = splitSeed(testSeed, 5, 3);
    const reconstructed = reconstructSeed(shares.slice(0, 2));
    expect(reconstructed).not.toBe(testSeed);
  });

  test('verifyShare returns true for valid share format', () => {
    const shares = splitSeed(testSeed, 5, 3);
    expect(verifyShare(shares[0])).toBe(true);
  });
});
