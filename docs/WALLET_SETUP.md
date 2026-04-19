# Wallet Setup Guide

This guide walks you through connecting your wallet to the Custos Bitcoin inheritance platform. Custos supports both hardware and software wallets for maximum flexibility.

## Supported Wallet Types

### Hardware Wallets (Recommended for Maximum Security)
- **Ledger Nano S/X**
- **Trezor Model T/One**
- **Coldcard Mk4**
- **BitBox02**
- **KeepKey**

### Software Wallets (Convenient Option)
- **BlueWallet** (iOS/Android)
- **Electrum** (Desktop)
- **Wasabi Wallet** (Desktop)
- **Samourai Wallet** (Android)
- **Muun Wallet** (Mobile)
- **Phoenix Wallet** (Lightning)

### Web Wallet Integration
- **MetaMask** (via WalletConnect)
- **Trust Wallet** (Mobile)
- **Rainbow Wallet** (Mobile)

## Understanding the 2-of-3 Multisig Structure

Custos uses a 2-of-3 multisig setup where you can choose different wallet types for each key:

- **Key 1**: Your primary wallet (hardware or software) — you control
- **Key 2**: Web app biometric key — stored securely in your browser/device
- **Key 3**: Custos HSM — released ONLY on inheritance trigger

**Important**: You can mix and match wallet types! For example:
- Hardware wallet + Web app key + HSM key (most secure)
- Software wallet + Web app key + HSM key (convenient)
- Two software wallets + HSM key (redundant backup)

## Prerequisites

### For Hardware Wallet Users
1. **Hardware Wallet**: Ensure your device is initialized and you have your recovery phrase stored securely
2. **Browser Extension**: Install the appropriate wallet connector:
   - Ledger: [Ledger Live](https://www.ledger.com/ledger-live)
   - Trezor: [Trezor Suite](https://suite.trezor.io/)
   - Coldcard: [Coldcard Simulator](https://coldcard.com/) or direct USB connection
3. **Updated Firmware**: Ensure your hardware wallet has the latest firmware
4. **Bitcoin App**: Install the Bitcoin app on your hardware wallet

### For Software Wallet Users
1. **Software Wallet**: Download and install your preferred wallet from official sources
2. **Backup**: Securely store your recovery phrase offline
3. **Test Transaction**: Send a small test transaction to ensure wallet works properly
4. **WalletConnect**: For mobile wallets, ensure WalletConnect support

### For All Users
1. **Secure Environment**: Use a trusted computer and network
2. **2FA**: Enable two-factor authentication on your Custos account
3. **Browser**: Use updated Chrome, Firefox, Safari, or Edge

## Setup Process

### Step 1: Connect Your Wallet

#### Hardware Wallet Users

##### Ledger Devices
1. Connect your Ledger device via USB
2. Unlock with your PIN
3. Open the Bitcoin app on your Ledger device
4. Enable "Browser Support" in settings if prompted
5. Allow "U2F" and "WebUSB" when prompted by your browser

##### Trezor Devices
1. Connect your Trezor via USB
2. Enter your PIN on the device
3. Open Trezor Suite in your browser
4. Navigate to Settings → Device → Enable "Passphrase" if you use one
5. Ensure "Bitcoin" app is selected

##### Coldcard Devices
1. Connect via USB or SD card
2. Enter your PIN
3. Navigate to Settings → Multisig Wallets → Enable
4. For USB: Use Coldcard simulator mode
5. For SD card: Export xpub via SD card

#### Software Wallet Users

##### Desktop Wallets (Electrum, Wasabi)
1. Open your wallet software
2. Navigate to Settings → Tools → Show Master Public Keys
3. Select the appropriate derivation path (m/48'/0'/0'/2' for Taproot)
4. Copy the extended public key (xpub)
5. Keep your wallet open during Custos setup

##### Mobile Wallets (BlueWallet, Muun)
1. Open your mobile wallet app
2. Find "Export Keys" or "Wallet Settings"
3. Select "Export xpub" or "Public Key"
4. Use QR code display or copy to clipboard
5. Scan with your computer camera during Custos setup

##### Web Wallets (MetaMask, Trust Wallet)
1. Install WalletConnect browser extension
2. Connect your mobile wallet via WalletConnect QR code
3. Approve connection requests
4. Select Bitcoin network (if available)
5. Approve key export for multisig setup

### Step 2: Initialize Connection in Custos

1. Navigate to the **Dashboard** in the Custos web app
2. Click **"Connect Wallet"**
3. Select your wallet type from the dropdown:
   - **Hardware Wallet**: Choose manufacturer (Ledger, Trezor, etc.)
   - **Software Wallet**: Choose application (Electrum, BlueWallet, etc.)
   - **Web Wallet**: Choose WalletConnect option
4. Follow the on-screen prompts specific to your wallet type
5. Approve the connection request on your wallet device/app

### Step 3: Create Multisig Vault

1. **Generate Extended Public Key (xpub)**
   - Your wallet will generate a new xpub for the multisig setup
   - Hardware wallet users: Verify the address on your device screen
   - Software wallet users: Confirm the export in your wallet app
   - Confirm the export in Custos

2. **Configure 2-of-3 Multisig**
   - **Key 1**: Your wallet (hardware or software) — you control
   - **Key 2**: Custos web app (encrypted storage) — you control
   - **Key 3**: Custos HSM (institutional security) — inheritance only

3. **Verify Addresses**
   - Review the generated multisig addresses
   - Hardware wallet users: Verify on device screen
   - Software wallet users: Cross-reference with your wallet app
   - Save the backup descriptors securely

### Step 4: Fund Your Vault

1. **Generate Deposit Address**
   - Click "Generate New Address" in your vault
   - Hardware wallet users: Verify the address on your device screen
   - Software wallet users: Cross-reference with your wallet app
   - Copy the address for funding

2. **Send Bitcoin**
   - Send a small test amount first (0.001 BTC recommended)
   - Wait for confirmation
   - Verify the balance appears in your Custos dashboard

3. **Full Funding**
   - Once confirmed, send your main holdings
   - Consider multiple transactions for larger amounts

## Security Best Practices

### Before Setup
- [ ] Test with small amounts first
- [ ] Ensure your recovery phrase is stored offline and securely
- [ ] Update all device firmware
- [ ] Use a dedicated computer if possible
- [ ] Clear browser cache and cookies

### During Setup
- [ ] Always verify addresses on your hardware wallet screen
- [ ] Never share your recovery phrase or PIN
- [ ] Use a secure, private internet connection
- [ ] Enable 2FA on your Custos account

### After Setup
- [ ] Store your multisig descriptors offline
- [ ] Test a small withdrawal to ensure everything works
- [ ] Set up your dead man's switch preferences
- [ ] Add your heirs and complete verification

## Troubleshooting

### Common Issues

**Device Not Recognized**
- Try a different USB cable
- Restart browser and hardware wallet
- Check if browser supports WebUSB (Chrome, Edge, Opera)
- Update browser to latest version

**Connection Timeout**
- Ensure hardware wallet is unlocked
- Check Bitcoin app is open on device
- Disable VPN or proxy temporarily
- Try incognito/private browsing mode

**Address Mismatch**
- Refresh the page and retry
- Ensure you're using the correct derivation path (standard: m/48'/0'/0'/2')
- Check for firmware updates
- Contact support if issue persists

**Transaction Fails**
- Verify sufficient fees
- Check network status
- Ensure UTXOs are confirmed
- Try with a smaller amount first

### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Device locked" | Hardware wallet PIN not entered | Enter PIN on device |
| "Invalid xpub" | Wrong derivation path | Use standard BIP86 taproot path |
| "Insufficient funds" | Not enough BTC + fees | Add more BTC or reduce amount |
| "Connection refused" | Browser security issue | Try different browser or incognito mode |

## Advanced Configuration

### Custom Derivation Paths
For advanced users, you can specify custom derivation paths:
```
Standard Taproot: m/48'/0'/0'/2'
Legacy: m/44'/0'/0'
SegWit: m/49'/0'/0'
Native SegWit: m/84'/0'/0'
```

### Multiple Wallets
You can connect multiple hardware wallets to the same vault:
1. Repeat setup process for each device
2. Each device generates its own xpub
3. Combine in a 2-of-3 or 3-of-5 multisig setup

### Watch-Only Wallets
Create watch-only wallets for monitoring:
1. Export xpub without private keys
2. Import into Custos as watch-only
3. Monitor balances without spending capability

## Support

If you encounter issues during setup:

1. **Check this guide** for common solutions
2. **Visit our FAQ** at [custos.io/faq](https://custos.io/faq)
3. **Contact Support**: support@custos.io
4. **Community Forum**: [forum.custos.io](https://forum.custos.io)

## Emergency Recovery

If your hardware wallet is lost or damaged:

1. **Use Recovery Phrase**: Restore on a new device of the same brand
2. **Contact Custos**: We can help reconstruct your multisig setup
3. **Heir Process**: Your designated heirs can initiate the inheritance protocol

Remember: Your bitcoin is protected by the 2-of-3 multisig structure, so loss of one key doesn't compromise your funds.
