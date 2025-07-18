// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.register);

// Verify OTP route
router.post('/verify-otp', authController.verifyOTP);

// Login route
router.post('/login', authController.login);

module.exports = router;