# Custos Web Application

This README contains information specific to the Custos web application workspace.

## Overview
This is the main web application for the Custos Bitcoin inheritance platform, built with Next.js, React, and TypeScript.

## Quick Start
For complete project setup instructions, see the [main README.md](../README.md) in the parent directory.

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
# Start backend API server (runs on port 4001)
npm run dev:backend

# Start main web app (runs on port 3001) 
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

## Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Prisma**: ORM for database operations
- **PostgreSQL**: Primary database

### Bitcoin Integration
- **LND**: Lightning Network Daemon
- **Polar**: Bitcoin development environment
- **Multisig**: Multi-signature wallet support

## Project Structure
```
apps/web/              # Main web application
apps/web-concierge/    # Concierge portal
apps/web-heir/         # Heir portal
backend/             # Node.js API server
bitcoin/              # Bitcoin module
```

## Environment Variables
See `.env.example` in each package for configuration details.

For detailed setup instructions, see the main project README.
