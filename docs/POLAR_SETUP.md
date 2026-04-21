# Polar Testing Setup for Custos

This document explains how to set up Polar for testing the Custos Bitcoin inheritance platform.

## Overview

Polar is a perfect sandbox for testing Custos because it allows you to simulate complex interactions between your three distinct layers (Web/Backend, Lightning, and Bitcoin) without using real funds.

## Architecture Mapping

Your Custos architecture maps to Polar as follows:

1. **Bitcoin Node** - Backend Bitcoin Core node acting as source of truth for 2-of-3 Multisig Vault and Fund Transfer sweep
2. **Lightning Node** - LND node representing your middle column (Daily spending channels)
3. **Heir Node** - Second LND or Core node representing destination for Legacy Package and Fund Transfer

## Environment Setup

### .env.local Configuration

Create or update your `.env.local` file in the backend with Polar credentials:

```bash
# --- Lightning Node (LND) Credentials ---
# The GRPC host is for internal backend communication
LND_GRPC_HOST="127.0.0.1:10001" 
# Use "Admin Macaroon" to allow your app to move funds
LND_MACAROON="0201036c6e64..." 
# The TLS Cert allows a secure connection to local node
LND_TLS_CERT="454e5449464943415445..." 

# --- Bitcoin Core (The "Vault" Layer) ---
# Used for your Multisig and PSBT signing engine
BITCOIN_RPC_HOST="127.0.0.1:18443"
BITCOIN_RPC_USER="polaruser"
BITCOIN_RPC_PASS="polarpass"

# --- App Logic Settings ---
# Since Polar uses local simulation, this must be 'regtest'
NETWORK="regtest"
DEAD_MAN_SWITCH_INTERVAL_SECONDS=86400
```

### Finding Credentials in Polar

1. **LND Host**: Look for GRPC Host (usually 127.0.0.1 followed by 10001, 10002, etc.)
2. **Macaroon/TLS**: In Connect tab, change dropdown from "File Path" to "Hex". Copy that long string of random characters
3. **Bitcoin RPC**: Click on Bitcoin Core node in your Polar graph. The username/password are usually defaulted to polaruser and polarpass

## Testing Workflow

### 1. Fund the Vault
1. Generate a multisig address using your app's logic
2. In Polar, select Bitcoin Core node, go to Actions, and use "Send to Address" feature to fund your app's vault address with regtest BTC

### 2. Trigger the Switch
1. Manually trigger your Dead Man Switch backend service
2. Your app should now call your PSBT Signing Engine

### 3. Co-signing and Broadcast
1. Your backend (Key Custodian) provides second signature
2. Use your app to broadcast final transaction to Polar Bitcoin node
3. **Crucial Step**: In Polar, click "Mine" button in top toolbar. Your "Fund Transfer" won't show as complete until you manually mine a block in simulation

### 4. Testing Watchtower & Channel State
1. Open a channel between your "User Node" and a "Peer Node" in Polar
2. Force-close channel while one node is offline
3. Check if your Watchtower service (connected to Polar node via RPC) detects state change and updates your Concierge Portal

## Advanced Configuration

Since your architecture has a Watchtower and a Key Custodian, you might want to add multiple LND entries:

```bash
# User node
USER_LND_GRPC_HOST="127.0.0.1:10001"
USER_LND_MACAROON="0201036c6e64..."
USER_LND_TLS_CERT="454e5449464943415445..."

# Heir node  
HEIR_LND_GRPC_HOST="127.0.0.1:10002"
HEIR_LND_MACAROON="0201036c6e64..."
HEIR_LND_TLS_CERT="454e5449464943415445..."
```

## Integration Notes

- Use libraries like `lightning` (ln-service) or `bolt11` to handle these credentials in your Next.js API routes
- Ensure your Next.js backend points to Polar instead of a real network
- Test all inheritance protocol steps in the simulated environment before moving to testnet/mainnet

## Security Considerations

- Never commit real credentials to version control
- Use separate configurations for development, staging, and production
- Polar credentials are for testing only - never use in production
