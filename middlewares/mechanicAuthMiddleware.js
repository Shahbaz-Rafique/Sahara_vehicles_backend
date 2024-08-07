// const jwt = require('jsonwebtoken');
// const Mechanic = require('../models/Mechanic');

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const seller = await Mechanic.findOne({ _id: decoded._id, 'tokens.token': token });

//         if (!seller) {
//             throw new Error();
//         }

//         req.token = token;
//         req.seller = seller;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Please authenticate.' });
//     }
// };

// module.exports = authMiddleware;


// const jwt = require('jsonwebtoken');
// const Mechanic = require('../models/Mechanic'); // or the correct path to your Mechanic model

// const mechanicAuthMiddleware = async (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).send({ error: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // replace 'your_secret_key' with your actual secret key
//         const mechanic = await Mechanic.findOne({ _id: decoded._id, 'tokens.token': token });
//         if (!mechanic) {
//             return res.status(404).send({ error: 'Mechanic not found' });
//         }
// req.token=token;
//         req.user = mechanic; // Attach the mechanic to the req object
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Authentication failed' });
//     }
// };

// module.exports = mechanicAuthMiddleware;






const jwt = require('jsonwebtoken');
const Mechanic = require('../models/Mechanic'); // or the correct path to your Mechanic model

const mechanicAuthMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const mechanic = await Mechanic.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!mechanic) {
            return res.status(404).send({ error: 'Mechanic not found' });
        }

        console.log('Authenticated Mechanic:', mechanic._id); // Log the mechanic ID
        req.token = token;
        req.user = mechanic;
        next();
    } catch (error) {
        console.error('Authentication failed:', error); // Log the error
        res.status(401).send({ error: 'Authentication failed' });
    }
};

module.exports = mechanicAuthMiddleware;
