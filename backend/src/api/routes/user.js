const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');
const prisma = new PrismaClient();

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { vault: true, switch: true, heirs: true },
    });
    res.json(user);
  } catch (err) { next(err); }
});

router.patch('/push-token', authenticate, async (req, res, next) => {
  try {
    const { pushToken } = req.body;
    await prisma.user.update({ where: { id: req.user.userId }, data: { pushToken } });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

module.exports = router;
