# Custos — Bitcoin Inheritance & Security Platform

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
