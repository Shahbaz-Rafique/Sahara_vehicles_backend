const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Seller = require('../models/Seller');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

router.post('/cars', authMiddleware, upload.array('images'), async (req, res) => {
    const { grade, make, model, year, mileage, price,location, comments } = req.body;
    const images = req.files.map(file => file.filename); 

    try {
        const car = {
            grade,
            make,
            model,
            year,
            mileage,
            images,
            price,
            location,
            comments,
            inspect: false 
        };

        req.seller.cars.push(car);
        await req.seller.save();
        res.status(201).send({ message: 'Car information uploaded successfully' });
    } catch (error) {
        res.status(400).send({ error: 'Error uploading car information' });
    }
});

router.get('/my-cars', authMiddleware, async (req, res) => {
    try {
        const seller = req.seller;
        res.status(200).send(seller.cars);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching car information' });
    }
});

router.get('/deletecar', authMiddleware, async (req, res) => {
    try {
        const carId = req.query.carId; 
        const sellerEmail = req.query.email;

        if (!carId) {
            return res.status(400).send({ error: 'Car ID is required' });
        }

        const seller = await Seller.findOne({ email: sellerEmail });

        if (!seller) {
            return res.status(404).send({ error: 'Seller not found' });
        }

        const carIndex = seller.cars.findIndex(car => car._id.toString() === carId);

        if (carIndex === -1) {
            return res.status(404).send({ error: 'Car not found in seller\'s cars' });
        }

        seller.cars.splice(carIndex, 1);
        await seller.save();

        res.status(200).send({ message: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error deleting car' });
    }
});

router.get('/admin_deletecar', async (req, res) => {
    try {
        const carId = req.query.carId; 
        const sellerId = req.query.sellerId;

        console.log(carId,sellerId);

        if (!carId) {
            return res.status(400).send({ error: 'Car ID is required' });
        }

        if (!sellerId) {
            return res.status(400).send({ error: 'Seller ID is required' });
        }

        // Fetch the seller by ID
        const seller = await Seller.findById(sellerId);

        if (!seller) {
            return res.status(404).send({ error: 'Seller not found' });
        }

        const carIndex = seller.cars.findIndex(car => car._id.toString() === carId);

        if (carIndex === -1) {
            return res.status(404).send({ error: 'Car not found in seller\'s cars' });
        }

        // Remove the car from the seller's list
        seller.cars.splice(carIndex, 1);
        await seller.save();

        res.status(200).send({ message: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error deleting car' });
    }
});

router.post('/updatecar', authMiddleware, async (req, res) => {
    try {
        const carId = req.query.id; 
        const sellerEmail = req.query.email; 
        console.log(req.body);

        if (!carId) {
            return res.status(400).send({ error: 'Car ID is required' });
        }

        const seller = await Seller.findOne({ email: sellerEmail });

        if (!seller) {
            return res.status(404).send({ error: 'Seller not found' });
        }

        const carIndex = seller.cars.findIndex(car => car._id.toString() === carId);

        if (carIndex === -1) {
            return res.status(404).send({ error: 'Car not found in seller\'s cars' });
        }

        const updatedCar = req.body;

        seller.cars[carIndex] = {
            ...seller.cars[carIndex],
            ...updatedCar
        };

        await seller.save();

        res.status(200).send({ message: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error updating car' });
    }
});

router.get('/deleteimage', authMiddleware, async (req, res) => {
    try {
        const { carId, imageIndex, sellerEmail } = req.query;

        if (imageIndex === undefined || !carId || !sellerEmail) {
            return res.status(400).send({ error: 'Car ID, image index, and seller email are required' });
        }

        const index = parseInt(imageIndex, 10);
        if (isNaN(index)) {
            return res.status(400).send({ error: 'Invalid image index' });
        }

        const seller = await Seller.findOne({ email: sellerEmail });

        if (!seller) {
            return res.status(404).send({ error: 'Seller not found' });
        }

        const car = seller.cars.find(car => car._id.toString() === carId);

        if (!car) {
            return res.status(404).send({ error: 'Car not found in seller\'s cars' });
        }

        if (index < 0 || index >= car.images.length) {
            return res.status(404).send({ error: 'Image index out of range' });
        }

        car.images.splice(index, 1);

        try {
            await seller.save();
            res.status(200).send({ message: 'Image deleted successfully' });
        } catch (saveErr) {
            if (saveErr.name === 'VersionError') {
                // Handle version conflict
                const freshSeller = await Seller.findOne({ email: sellerEmail });
                if (freshSeller) {
                    // Retry the operation
                    const freshCar = freshSeller.cars.find(car => car._id.toString() === carId);
                    if (freshCar) {
                        freshCar.images.splice(index, 1);
                        await freshSeller.save();
                        return res.status(200).send({ message: 'Image deleted successfully' });
                    }
                }
                res.status(500).send({ error: 'Failed to delete image due to version conflict' });
            } else {
                throw saveErr;
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error processing request' });
    }
});

// New route for fetching all cars
router.get('/all-cars', async (req, res) => {
    try {
        const sellers = await Seller.find({}, 'cars'); 
        const allCars = sellers.flatMap(seller => seller.cars);
        res.status(200).send(allCars);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching all car information' });
    }
});

module.exports = router;
