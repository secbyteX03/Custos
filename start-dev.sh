#!/bin/bash
echo "Starting Custos development environment..."
echo ""
echo "1. Starting PostgreSQL + Bitcoin node (Docker)..."
docker-compose up -d postgres bitcoind lnd
sleep 3

echo "2. Running database migrations..."
cd backend && npx prisma migrate dev --name init && cd ..

echo "3. Starting backend API on port 4000..."
cd backend && npm run dev &
BACKEND_PID=$!
cd ..

echo ""
echo "Custos is running:"
echo "  Backend API:      http://localhost:4000"
echo "  Health check:     http://localhost:4000/health"
echo "  Web app:          cd apps/web && npm run dev"
echo "  Concierge portal: cd apps/web-concierge && npm run dev"
echo "  Heir portal:      cd apps/web-heir && npm run dev"
echo ""
echo "Press Ctrl+C to stop."
wait $BACKEND_PID
