const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, login } = require('../controllers/authController');
const auth = require('../controllers/authController');

router.post('/register', sendOtp);  // Step 1: send OTP
router.post('/verify', verifyOtp);  // Step 2: verify OTP and create user
router.post('/login', login);    

router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password', auth.resetPassword);

module.exports = router;
