# Custos — Bitcoin Inheritance & Security Platform

## Introduction

Custos is a comprehensive Bitcoin inheritance and security platform designed to solve one of cryptocurrency's biggest challenges: what happens to your digital assets when you're no longer here to manage them. Our platform ensures your Bitcoin wealth reaches your loved ones automatically, securely, and without compromising the self-custody principles that make Bitcoin valuable.

Built with institutional-grade security and user-friendly interfaces, Custos combines cutting-edge cryptographic techniques with practical inheritance planning to create a seamless bridge between Bitcoin's decentralized nature and traditional estate planning needs.

## The Problem We Solve

### The Silent Crisis of Lost Bitcoin

Every year, an estimated **$10-20 billion worth of Bitcoin** becomes permanently inaccessible due to owner death, disability, or simple loss of private keys. Unlike traditional assets, Bitcoin cannot be recovered through court orders or legal proceedings - once the private keys are lost, the funds are gone forever.

### Why Traditional Solutions Fail

- **Legal Systems Can't Help**: Courts and lawyers cannot access or recover Bitcoin private keys
- **Estate Planning Gaps**: Traditional wills and trusts don't account for digital asset custody
- **Security vs. Accessibility Trade-off**: Sharing keys with family creates security risks
- **Technical Complexity**: Most beneficiaries lack the technical knowledge to manage Bitcoin inheritance
- **No Recovery Mechanisms**: Bitcoin's design provides no built-in recovery or inheritance features

### The Human Cost

Behind every lost Bitcoin is a family's financial security, a lifetime of savings, or a legacy meant to support future generations. The current system forces Bitcoin holders to choose between:
1. **Risking total loss** by keeping secrets to themselves
2. **Compromising security** by sharing sensitive information
3. **Burdening loved ones** with complex technical challenges during an already difficult time

## Our Solution

Custos addresses these challenges through a sophisticated multi-layered approach:

### **2-of-3 Multisig Security**
- **Your Hardware Wallet**: You maintain primary control
- **Web App Key**: Encrypted biometric-secured backup
- **Institutional HSM**: Professional-grade security released only on verified inheritance

### **Automated Dead Man's Switch**
- Configurable check-in schedules
- Grace periods to prevent false triggers
- Multiple notification channels (email, SMS, push)
- Heir verification before fund release

### **Professional Inheritance Process**
- KYC verification for beneficiaries
- Legal documentation integration
- Step-by-step guidance for heirs
- Support for complex family structures

### **Bank-Grade Security**
- AWS CloudHSM for key storage
- PGP encryption for all communications
- Regular security audits
- Compliance with financial regulations

## Project Structure

```
custos/
├── apps/
│   ├── web/              # Next.js — main user-facing web app
│   ├── web-concierge/    # Next.js — setup specialist dashboard
│   └── web-heir/         # Next.js — heir claim portal
├── backend/              # Node.js + Express API
│   └── src/
│       ├── api/          # Routes + middleware
│       ├── services/     # Business logic
│       ├── models/       # DB models (Prisma)
│       └── jobs/         # Cron scheduler (dead man's switch)
├── bitcoin/              # Bitcoin/Lightning logic
│   ├── multisig/         # Taproot 2-of-3 vault setup
│   ├── lightning/        # LND/CLN watchtower integration
│   ├── psbt/             # PSBT construction + signing
│   └── recovery/         # Shamir secret sharing, social recovery
└── docs/                 # Architecture + API docs
```

## Stack
- **Web App**: Next.js, React, TypeScript, Tailwind CSS (Yellow accent theme)
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL
- **Bitcoin**: bitcoinjs-lib, LND gRPC, BDK (Bitcoin Dev Kit)
- **Security**: HSM via AWS CloudHSM, PGP via openpgp.js
- **Scheduler**: node-cron (Dead Man's Switch state machine)
- **Notifications**: Push notifications, Twilio SMS, SendGrid Email

## Quick Start

### Clone the Repository
```bash
git clone https://github.com/secbyteX03/Custos.git
cd Custos/custos_app
```

### Installation & Setup
```bash
# Install all workspaces (root, backend, web apps, bitcoin modules)
npm install

# Set up environment variables
cp backend/.env.example backend/.env
cp apps/web/.env.example apps/web/.env
# Edit .env files with your configuration
```

### Development Servers
```bash
# Start backend API server (runs on port 3001)
npm run dev:backend

# Start main web app (runs on port 3000) 
npm run dev:web

# Start concierge dashboard (runs on port 3002)
npm run dev:concierge

# Start heir portal (runs on port 3003)
npm run dev:heir

# Or start all services at once
npm run dev
```

### Testing
```bash
# Run Bitcoin module tests (regtest mode)
npm run test:bitcoin

# Run backend tests
npm run test:backend

# Run web app tests
npm run test:web

# Run all tests
npm test
```

## Environment Variables
See `.env.example` in each package.
