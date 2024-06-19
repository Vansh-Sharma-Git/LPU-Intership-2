const express = require('express');
const { requestPasswordReset, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/request-password-reset', requestPasswordReset);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
