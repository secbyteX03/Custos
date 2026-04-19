const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');
const { setupMultisigVault } = require('../../services/vault');
const prisma = new PrismaClient();

// POST /api/vault/setup — called during concierge onboarding session
router.post('/setup', authenticate, async (req, res, next) => {
  try {
    const { xpubUser, xpubPhone, heirPgpPublicKey, vaultType = 'MULTISIG_2OF3' } = req.body;
    const vault = await setupMultisigVault({
      userId: req.user.userId,
      xpubUser,
      xpubPhone,
      heirPgpPublicKey,
      vaultType,
    });
    res.status(201).json(vault);
  } catch (err) { next(err); }
});

// GET /api/vault/status
router.get('/status', authenticate, async (req, res, next) => {
  try {
    const vault = await prisma.vault.findUnique({ where: { userId: req.user.userId } });
    res.json(vault || { status: 'NOT_CONFIGURED' });
  } catch (err) { next(err); }
});

module.exports = router;
