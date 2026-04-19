const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const { startForensicRecovery, getSocialRecoveryStatus } = require('../../services/recovery');

// POST /api/recovery/forensic — partner with recovery services
router.post('/forensic', authenticate, async (req, res, next) => {
  try {
    const { walletType, clues } = req.body; // e.g. walletType: 'dat_file', clues: ['partial_password']
    const result = await startForensicRecovery({ userId: req.user.userId, walletType, clues });
    res.json(result);
  } catch (err) { next(err); }
});

// GET /api/recovery/social/status
router.get('/social/status', authenticate, async (req, res, next) => {
  try {
    const status = await getSocialRecoveryStatus(req.user.userId);
    res.json(status);
  } catch (err) { next(err); }
});

module.exports = router;
