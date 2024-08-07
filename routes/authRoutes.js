// In your routes file, e.g., authRoutes.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route for initiating Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for handling callback from Google OAuth
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to the dashboard or any other page
        res.redirect('/seller/dashboard');
    });

module.exports = router;
