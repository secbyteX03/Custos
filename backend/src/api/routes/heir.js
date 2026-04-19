const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate, authenticateHeir } = require('../middleware/auth');
const { initiateHeirKYC, processHeirClaim } = require('../../services/inheritance');
const prisma = new PrismaClient();

// POST /api/heir/register — user registers heir during onboarding
router.post('/register', authenticate, async (req, res, next) => {
  try {
    const { name, email, phone, relationship, pgpPublicKey } = req.body;
    const heir = await prisma.heir.create({
      data: { userId: req.user.userId, name, email, phone, relationship, pgpPublicKey },
    });
    res.status(201).json(heir);
  } catch (err) { next(err); }
});

// POST /api/heir/claim/initiate — heir initiates claim after switch fires
// Uses a special claim link token, not normal user JWT
router.post('/claim/initiate', async (req, res, next) => {
  try {
    const { claimToken, newWalletAddress } = req.body;
    // claimToken is sent in the legacy package email
    const result = await initiateHeirKYC({ claimToken, newWalletAddress });
    res.json(result);
  } catch (err) { next(err); }
});

// POST /api/heir/claim/complete — called by KYC webhook after heir passes
router.post('/claim/complete', async (req, res, next) => {
  try {
    const { heirId, kycSessionId } = req.body;
    // Webhook from KYC provider (Smile Identity, Sumsub, etc.)
    const result = await processHeirClaim({ heirId, kycSessionId });
    res.json(result);
  } catch (err) { next(err); }
});

module.exports = router;
