const express = require('express');
const router = express.Router();
const { googleAuth, googleAuthCallback, userProfile } = require('../controllers/RegisterGoogle');

// Google OAuth Routes
router.get('/google', googleAuth);

router.get('/google/callback', googleAuthCallback);

router.get('/profile', userProfile);

module.exports = router;
