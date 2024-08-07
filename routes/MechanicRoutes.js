// const express = require('express');
// const router = express.Router();
// const Mechanic = require('../models/Mechanic');
// const Seller = require('../models/Seller');

// // Route for mechanic to inspect a car
// router.post('/inspect/:carId', async (req, res) => {
//     const mechanicId = req.user._id; // Assuming mechanic is authenticated and user ID is available
//     const carId = req.params.carId;
//     const inspectionDetails = req.body;

//     try {
//         const mechanic = await Mechanic.findById(mechanicId);
//         const car = await Seller.findOne({ 'cars._id': carId });

//         if (!car) {
//             return res.status(404).send('Car not found');
//         }

//         await mechanic.performInspection(car._id, carId, inspectionDetails);

//         res.status(200).send('Inspection recorded successfully');
//     } catch (error) {
//         res.status(500).send('Error performing inspection');
//     }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanicController');
const mechanicAuthMiddleware = require('../middlewares/mechanicAuthMiddleware');

router.post('/inspect/:carId', mechanicAuthMiddleware, mechanicController.inspectCar);

module.exports = router;