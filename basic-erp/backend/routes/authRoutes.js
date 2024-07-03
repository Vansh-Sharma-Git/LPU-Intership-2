// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../contollers/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/user-dashboard', verifyToken, (req, res) => {
  if (req.userRole !== 'user') {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.status(200).json({ message: 'Welcome to the user dashboard' });
});

router.get('/admin-dashboard', verifyToken, (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
