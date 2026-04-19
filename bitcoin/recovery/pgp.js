/**
 * Legacy Guard — PGP Encryption for Legacy Package
 *
 * The legacy package is encrypted to the heir's public key at ONBOARDING time.
 * The server stores ONLY the ciphertext — it cannot read the package.
 * Decryption happens client-side in the heir's browser.
 *
 * Package contents:
 *   - Exchange account list (Coinbase, Kraken, etc.)
 *   - Vault derivation paths
 *   - Social recovery guardian list
 *   - Pre-generated legal document templates
 *   - Forensic recovery instructions
 */
const openpgp = require('openpgp');

/**
 * Encrypt the legacy package to the heir's PGP public key.
 * Called once during onboarding, stored as ciphertext.
 */
async function encryptLegacyPackage({ packageData, heirPublicKeyArmored }) {
  const publicKey = await openpgp.readKey({ armoredKey: heirPublicKeyArmored });
  const message = await openpgp.createMessage({
    text: JSON.stringify(packageData, null, 2),
  });
  const encrypted = await openpgp.encrypt({
    message,
    encryptionKeys: publicKey,
  });
  return encrypted; // PGP armored ciphertext
}

/**
 * Decrypt the legacy package — runs CLIENT-SIDE in the heir's browser.
 * The private key never leaves the heir's device.
 */
async function decryptLegacyPackage({ ciphertext, heirPrivateKeyArmored, passphrase }) {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: heirPrivateKeyArmored }),
    passphrase,
  });
  const message = await openpgp.readMessage({ armoredMessage: ciphertext });
  const { data } = await openpgp.decrypt({ message, decryptionKeys: privateKey });
  return JSON.parse(data);
}

/**
 * Generate a new PGP keypair for a user or heir during onboarding.
 * Private key returned once and must be stored securely by the user.
 */
async function generateKeyPair({ name, email, passphrase }) {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'ecc',
    curve: 'curve25519',
    userIDs: [{ name, email }],
    passphrase,
    format: 'armored',
  });
  return { privateKey, publicKey };
}

/**
 * Build the legacy package JSON structure.
 * This is what gets encrypted and stored at onboarding.
 */
function buildLegacyPackage({ user, vault, heirs, exchanges, trustedContacts }) {
  return {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    owner: { name: user.name, email: user.email },
    vault: {
      type: vault.vaultType,
      derivationPaths: {
        userKey: "m/48'/0'/0'/2'",
        phoneKey: "m/48'/0'/1'/2'",
      },
      note: 'Contact Legacy Guard support to co-sign the inheritance PSBT.',
    },
    exchanges: exchanges.map(ex => ({
      name: ex.name,
      accountEmail: ex.accountEmail,
      url: ex.url,
      notes: ex.notes,
      recoveryDocs: 'See legal_templates/ folder for death certificate submission process.',
    })),
    socialRecovery: {
      guardians: trustedContacts.map(c => ({ name: c.name, email: c.email, phone: c.phone })),
      threshold: '2-of-3 guardians required',
    },
    legalNotes: [
      'Contact each exchange directly with a death certificate and Letters Testamentary.',
      'Legacy Guard will provide a signed statement of account holdings upon request.',
      'For disputes, contact support@legacyguard.app with your claim token.',
    ],
  };
}

module.exports = { encryptLegacyPackage, decryptLegacyPackage, generateKeyPair, buildLegacyPackage };
