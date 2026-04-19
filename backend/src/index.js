require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { logger } = require('./utils/logger');
const { startScheduler } = require('./jobs/scheduler');

const authRoutes       = require('./api/routes/auth');
const userRoutes       = require('./api/routes/user');
const vaultRoutes      = require('./api/routes/vault');
const switchRoutes     = require('./api/routes/switch');
const heirRoutes       = require('./api/routes/heir');
const recoveryRoutes   = require('./api/routes/recovery');
const watchtowerRoutes = require('./api/routes/watchtower');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/api/auth',       authRoutes);
app.use('/api/user',       userRoutes);
app.use('/api/vault',      vaultRoutes);
app.use('/api/switch',     switchRoutes);
app.use('/api/heir',       heirRoutes);
app.use('/api/recovery',   recoveryRoutes);
app.use('/api/watchtower', watchtowerRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok', ts: Date.now() }));

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  logger.info(`Legacy Guard API running on port ${PORT}`);
  startScheduler();
});

module.exports = app;
