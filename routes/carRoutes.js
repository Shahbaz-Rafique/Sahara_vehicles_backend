const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Car = require('../models/carModel');

// Car registration route
router.post('/add', async (req, res) => {
    try {
        const car = new Car({
            name: req.body.name,
            img: req.body.img,
            model: req.body.model,
            price: req.body.price,
            no: req.body.no,
            registeredIn: req.body.registeredIn,
            color: req.body.color,
            assembly: req.body.assembly,
            engineCapacity: req.body.engineCapacity,
            bodyType: req.body.bodyType,
            carType: req.body.carType,
            additionalDetails: req.body.additionalDetails,
        });

        await car.save();

        res.status(201).json({
            success: true,
            message: "Car registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// List cars route
router.get('/list', async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json({
            success: true,
            cars,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.post('/buy',async (req,res)=>{
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'pkr',
                    product_data: {
                        name: '',
                        images:[``],
                    },
                    unit_amount: 100, 
                },
                quantity: quantity,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:4000/buy?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/cancel',
    });
    response.status(200).json({ sessionUrl: session.url });
})

// Get single car route
router.get('/:carId', async (req, res) => {
    try {
        const carId = req.params.carId;
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }
        res.status(200).json({
            success: true,
            car,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update car route
router.put('/update/:carId', async (req, res) => {
    try {
        const carId = req.params.carId;
        const updatedCar = await Car.findByIdAndUpdate(carId, req.body, { new: true });

        if (!updatedCar) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        res.status(200).json({
            success: true,
            car: updatedCar,
            message: "Car updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Delete car route
router.delete('/delete/:carId', async (req, res) => {
    try {
        const carId = req.params.carId;
        const deletedCar = await Car.findByIdAndDelete(carId);

        if (!deletedCar) {
            return res.status(404).json({
                success: false,
                message: "Car not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Car deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
