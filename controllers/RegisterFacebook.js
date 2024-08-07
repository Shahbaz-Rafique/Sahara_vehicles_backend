const dotenv = require('dotenv');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const strftime = require('strftime');
const bcrypt = require('bcryptjs'); // Assuming bcrypt is required for password hashing
const express = require('express');
const Seller = require('../models/Seller'); // Import your Seller model

// Load environment variables
dotenv.config();

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.facebook_id,
    clientSecret: process.env.facebook_secret,
    callbackURL: 'http://localhost:4000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email', 'gender'],
    scope: ['email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const profileId = profile.id;
        const pictureUrl = `https://graph.facebook.com/${profileId}/picture?type=large`;

        profile.photos = [{ value: pictureUrl }];
        return done(null, profile);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const userProfileFacebook = async (req, res) => { // Marking the function as async
    if (req.isAuthenticated()) {
        const currentDate = new Date();
        const formatString = '%Y-%m-%d %H:%M:%S';
        const formattedDate = strftime(formatString, currentDate);
        console.log(req.user);

        try {
            const seller = await Seller.findOne({ email: req.user.emails[0].value });

            if (!seller) {
                const email = req.user.emails[0].value;
                const name = req.user.displayName;
                const profilePicture = req.user.photos[0]?.value || null;
                const password = 'none';

                const newSeller = new Seller({
                    name,
                    email,
                    password: await bcrypt.hash(password, 8),
                });

                await newSeller.save();
                const token = await newSeller.generateAuthToken();
                return res.redirect(`http://localhost:3000/seller/dashboard?token=${token}&email=${email}`);
            } else {
                const token = await seller.generateAuthToken();
                return res.redirect(`http://localhost:3000/seller/dashboard?token=${token}&email=${req.user.emails[0].value}`);
            }
        } catch (error) {
            console.error('Error during user profile processing:', error);
            return res.status(500).send('Internal Server Error');
        }
    } else {
        res.redirect('/login');
    }
};

module.exports = {
    facebookAuth: passport.authenticate('facebook'),
    facebookAuthCallback: passport.authenticate('facebook', {
        failureRedirect: '/login',
        successRedirect: '/auth/facebook/profile'
    }),
    userProfile: userProfileFacebook,
};
