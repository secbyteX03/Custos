const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const { getChannelStatus, registerWatchtower } = require('../../services/watchtower');

// GET /api/watchtower/status
router.get('/status', authenticate, async (req, res, next) => {
  try {
    const status = await getChannelStatus(req.user.userId);
    res.json(status);
  } catch (err) { next(err); }
});

// POST /api/watchtower/register — called after LND node is set up
router.post('/register', authenticate, async (req, res, next) => {
  try {
    const { lndNodeUri, lndMacaroon } = req.body;
    const result = await registerWatchtower({ userId: req.user.userId, lndNodeUri, lndMacaroon });
    res.json(result);
  } catch (err) { next(err); }
});

module.exports = router;
