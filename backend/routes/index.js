const express = require('express')
const router = express.Router()

const authRouter = require('./auth')
const dashboardRouter = require('./dashboard')
const authenticate = require('../utils/auth/authenticate')

router.get('/', (req, res) => {
  res.send('<h1>Backend is running well!</h1>');
});
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/dashboard', authenticate.authMiddleware, dashboardRouter);

module.exports = router
