const express = require('express');
const Seller = require('../models/Seller');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const seller = new Seller({ name, email, password: hashedPassword });
        await seller.save();
        const token = await seller.generateAuthToken();
        res.status(201).send({ token, email });
    } catch (error) {
        res.status(400).send({ error: 'Signup failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const seller = await Seller.findOne({ email });
        if (!seller) {
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        const token = await seller.generateAuthToken();
        res.send({ token, email });
    } catch (error) {
        res.status(400).send({ error: 'Login failed' });
    }
});

module.exports = router;
