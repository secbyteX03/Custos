/**
 * Legacy Guard — Social Recovery via Shamir Secret Sharing
 *
 * For small holders who don't have hardware wallets.
 * The seed is split into N shares (e.g. 5), any M shares (e.g. 3) can reconstruct.
 *
 * Guardians: trusted family members or friends who each hold one share.
 * The user can recover their seed without any single guardian knowing the full secret.
 *
 * Uses: shamir-secret-sharing npm package (wrapper around slip39)
 */

const secrets = require('secrets.js-grempe');

/**
 * Split a BIP39 seed into shares.
 * @param {string} seedHex - 64-byte hex seed
 * @param {number} total - total number of shares to create (e.g. 5)
 * @param {number} threshold - minimum shares needed to reconstruct (e.g. 3)
 */
function splitSeed(seedHex, total = 5, threshold = 3) {
  const shares = secrets.share(seedHex, total, threshold);
  return shares; // Array of hex strings — one per guardian
}

/**
 * Reconstruct the seed from M-of-N shares.
 * @param {string[]} shares - array of share hex strings (at least threshold)
 */
function reconstructSeed(shares) {
  return secrets.combine(shares);
}

/**
 * Verify a single share is valid (can't be used alone, but format check passes).
 */
function verifyShare(share) {
  try {
    // Basic format validation
    return typeof share === 'string' && share.length > 10;
  } catch {
    return false;
  }
}

module.exports = { splitSeed, reconstructSeed, verifyShare };
