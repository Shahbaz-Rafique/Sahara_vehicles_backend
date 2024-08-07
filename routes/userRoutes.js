// Import necessary modules and models
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Seller = require('../models/Seller');
const Mechanic = require('../models/Mechanic');
const { hashPassword } = require('../utils/bcryptUtils');
const { adminAuth } = require('../middleware/authMiddleware');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51ODt61AfAfK8PTh8KiaftQyr9KnpcIXCoVxv3L1v8pub5G9oMPC43N58JsrssGR7cVWthYXay5Y3z7ziEZf7sn2S00B70iJlmm');
const dotenv = require('dotenv');
const Purchase = require('../models/purchaseModel');
const bcrypt = require('bcrypt');

// Load environment variables
dotenv.config();

// Endpoint to for admin verification
router.get('/isadmin', adminAuth, async (req, res) => {
    let user = await User.findOne({ _id: req.user.id })
    if (user.email !== 'admin@gmail.com') {
        return res.status(400).json({
            success: false,
            message: "Not authorized as an admin"
        })
    }
    res.json({
        success: true,
        message: "Admin verified successfully"
    })
})

router.post('/buy', async (req, res) => {
    try {
        const { name, price, quantity, imageUrl, userId, carId } = req.body; 

        const data = {
            name,
            price,
            quantity,
            imageUrl,
            userId,
            carId
        };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: name, 
                            images: [imageUrl]
                        },
                        unit_amount: price*100, 
                    },
                    quantity: quantity, 
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:4000/api/users/success?data=${JSON.stringify(data)}`,
            cancel_url: `http://localhost:4000/cancel`, 
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/success', async (req, res) => {
    try {
        const { name, price, quantity, imageUrl, userId, carId } = JSON.parse(req.query.data);

        if (!name || !price || !quantity || !imageUrl || !userId) {
            return res.status(400).send('Missing required query parameters');
        }

        const purchaseData = {
            userId,
            itemName: name,
            itemImageUrl: imageUrl,
            paymentStatus:"PAID",
            carId:carId,
            itemAmount: parseFloat(price),
            itemQuantity: parseInt(quantity, 10),
            timestamp: new Date(),
        };

        await Purchase.create(purchaseData);

        res.redirect('http://localhost:3000/success')
    } catch (error) {
        console.error('Error processing success route:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/users/:role/:id', async (req, res) => {
    try {
        const { role, id } = req.params;
        let deletedUser;

        if (role === 'Buyer') {
            deletedUser = await User.findByIdAndDelete(id);
        } else if (role === 'Seller') {
            deletedUser = await Seller.findByIdAndDelete(id);
        } else if (role === 'Mechanic') {
            deletedUser = await Mechanic.findByIdAndDelete(id);
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
});

router.get('/userslist',async (req,res)=>{
    try {
        const users = await User.find({}).select('name email date');
        const sellers = await Seller.find({}).select('name email date');
        const mechanics = await Mechanic.find({}).select('name email date');

        const formattedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: 'Buyer',
            date: user.date,
        }));

        const formattedSellers = sellers.map(seller => ({
            id:seller._id,
            name: seller.name,
            email: seller.email,
            role: 'Seller',
            date: seller.date,
        }));

        const formattedMechanics = mechanics.map(mechanic => ({
            id:mechanic._id,
            name: mechanic.name,
            email: mechanic.email,
            role: 'Mechanic',
            date: mechanic.date,
        }));

        const allUsers = [...formattedUsers, ...formattedSellers, ...formattedMechanics];

        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
})

router.put('/change-password', async (req, res) => {
    // try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findOne({ email: 'admin@gmail.com' });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPasswordOld = await hashPassword(currentPassword);
        console.log(hashedPasswordOld,user.password);
        
        if (hashedPasswordOld!=user.password) {
            return res.status(200).json({ message: 'incorrect' });
        }
        const hashedPasswordNew = await hashPassword(newPassword);
        user.password = hashedPasswordNew;
        await user.save();
        res.status(200).json({ message: 'success' });
    // } catch (err) {
    //     res.status(500).json({ message: 'Error updating password', error: err });
    // }
});


router.post('/adminpanellogin', async (req, res) => {
    try {
        let user = await User.findOne({ email: 'admin@gmail.com' });

        if (!user) {
            // Admin user does not exist, create it
            const adminPassword = 'admin123';
            const hashedPassword = await hashPassword(adminPassword);
            const newUser = new User({
                name: 'admin',
                email: 'admin@gmail.com',
                profile_image: 'https://www.gravatar.com/avatar/',
                password: hashedPassword,
            });

            user = await newUser.save();

            if (!user) {
                return res.status(500).json({
                    success: false,
                    message: 'Error creating admin user',
                });
            }
        }

        const emailMatch = req.body.email === user.email;

        if (!emailMatch) {
            console.log('email does not match');
            return res.status(400).json({
                success: false,
                message: 'Incorrect email',
            });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            console.log('password does not match');
            return res.status(400).json({
                success: false,
                message: 'Incorrect password',
            });
        }

        const data = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            success: true,
            token,
            message: 'Admin logged in successfully',
        });
    } catch (error) {
        console.error('Error during admin panel login:', error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get('/purchases', async (req, res) => {
    try {
        const purchase = await Purchase.find()
            .populate('userId', 'name email') 
            .populate('carId', 'name description price'); 

        if (!purchase) {
            return res.status(404).json({ success: false, message: 'Purchase not found' });
        }

        res.json({
            success: true,
            purchase
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Registration route
router.post('/register', async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });

        if (check) {
            return res.status(200).json({
                success: false,
            });
        }

        const hashedPassword = await hashPassword(req.body.password);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await user.save();

        const data = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(data, process.env.JWT_SECRET);
        const email= req.body.email;

        res.status(201).json({
            success: true,
            token,
            email,
            message: "User registered successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

const generateAuthToken = (user)=> {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    return token;
};

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        const token = await generateAuthToken(user);
        const id=user._id;
        res.send({ token, email, id });
    } catch (error) {
        res.status(400).send({ error: 'Login failed' });
    }
});


router.get('/cars',async (req,res)=>{
    try {
        const sellers = await Seller.find().select('cars');
        const cars = sellers.reduce((acc, seller) => {
            const sellerCars = seller.cars.map(car => ({
                ...car.toObject(), 
                sellerId: seller._id
            }));
            return acc.concat(sellerCars);
        }, []);
        res.send({cars});
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while fetching all cars' };
    }
})

// List users route
router.get('/list', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update user route
router.put('/update/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser,
            message: "User updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Delete user route
router.delete('/delete/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
