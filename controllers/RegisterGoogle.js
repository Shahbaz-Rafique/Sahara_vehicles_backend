const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const strftime = require('strftime');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

passport.use(new GoogleStrategy({
    clientID: process.env.client_id,
    clientSecret: process.env.client_secret,
    callbackURL: 'http://localhost:4000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const userProfileGoogle = async (req, res) => {
    if (req.isAuthenticated()) {
        const currentDate = new Date();
        const formatString = '%Y-%m-%d %H:%M:%S';
        const formattedDate = strftime(formatString, currentDate);

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
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    } else {
        res.redirect('/login');
    }
};

module.exports = {
    googleAuth: passport.authenticate('google', { scope: ['profile', 'email'] }),
    googleAuthCallback: passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/auth/profile'
    }),
    userProfile: userProfileGoogle,
};
