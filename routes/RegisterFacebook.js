const express = require('express');
const router = express.Router();
const { facebookAuth, facebookAuthCallback,userProfile } = require('../controllers/RegisterFacebook');

// Route for initiating Facebook authentication
router.get('/auth/facebook', facebookAuth);

router.get('/auth/facebook/callback', facebookAuthCallback);

router.get('/auth/facebook/profile', userProfile);
module.exports = router;
