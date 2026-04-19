const jwt = require('jsonwebtoken');
const { logger } = require('../../utils/logger');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    logger.warn('[Auth] Invalid token attempt');
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Heir-specific auth (separate JWT with limited scope)
function authenticateHeir(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No heir token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_HEIR_SECRET);
    if (decoded.scope !== 'heir_claim') return res.status(403).json({ error: 'Invalid scope' });
    req.heir = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid heir token' });
  }
}

module.exports = { authenticate, authenticateHeir };
