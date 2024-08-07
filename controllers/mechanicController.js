


// const Mechanic = require('../models/Mechanic');
// const Seller = require('../models/Seller');

// const inspectCar = async (req, res) => {
//     const { carId } = req.params;
//     const inspectionDetails = req.body;

//     try {
//         // Find the seller by carId
//         const seller = await Seller.findOne({ "cars._id": carId });
//         if (!seller) {
//             return res.status(404).send({ error: 'Seller not found' });
//         }

//         // Perform the inspection and save it to the mechanic's record
//         await req.user.performInspection(seller._id, carId, inspectionDetails);

//         // Update the inspection status of the car
//         const car = seller.cars.id(carId);
//         car.inspect = true;
//         car.inspectionDetails = inspectionDetails;
//         await seller.save();

//         res.status(200).send({ success: 'Inspection completed successfully' });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// };

// module.exports = {
//     inspectCar,
// };


// const Mechanic = require('../models/Mechanic');
// const Seller = require('../models/Seller');

// const inspectCar = async (req, res) => {
//     const mechanic = req.user; // The authenticated mechanic
//     const { carId } = req.params;
//     const { paintCondition, dentsScratches, lightsCondition, bumpersMirrorsAlignment, dashboardControls, seatsUpholstery, airConditioning, cleanliness, engineCondition, transmissionFunctionality, leaksNoises, fluidLevels, suspensionComponents, steeringAlignment, tiresCondition, brakePerformance, brakePadsRotors, vibrationsNoises, batteryCondition, electricalComponents, wiringConnectors, airbagsSeatbelts, safetyComponents, compliance } = req.body;

//     try {
//         const seller = await Seller.findOne({ 'cars._id': carId });
//         if (!seller) {
//             return res.status(404).send({ error: 'Seller or car not found' });
//         }

//         const inspectionDetails = {
//             paintCondition,
//             dentsScratches,
//             lightsCondition,
//             bumpersMirrorsAlignment,
//             dashboardControls,
//             seatsUpholstery,
//             airConditioning,
//             cleanliness,
//             engineCondition,
//             transmissionFunctionality,
//             leaksNoises,
//             fluidLevels,
//             suspensionComponents,
//             steeringAlignment,
//             tiresCondition,
//             brakePerformance,
//             brakePadsRotors,
//             vibrationsNoises,
//             batteryCondition,
//             electricalComponents,
//             wiringConnectors,
//             airbagsSeatbelts,
//             safetyComponents,
//             compliance,
//         };

//         await mechanic.performInspection(seller._id, carId, inspectionDetails);

//         // Update the car inspection status and details in the seller's record
//         const car = seller.cars.id(carId);
//         car.inspect = true;
//         car.inspectionDetails = inspectionDetails;
//         await seller.save();

//         res.send({ success: 'Inspection completed successfully' });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// };

// const inspectCar = async (req, res) => {
//     const mechanic = req.user; // The authenticated mechanic
//     const { carId } = req.params;
//     const {
//         paintCondition, dentsScratches, lightsCondition, bumpersMirrorsAlignment,
//         dashboardControls, seatsUpholstery, airConditioning, cleanliness,
//         engineCondition, transmissionFunctionality, leaksNoises, fluidLevels,
//         suspensionComponents, steeringAlignment, tiresCondition, brakePerformance,
//         brakePadsRotors, vibrationsNoises, batteryCondition, electricalComponents,
//         wiringConnectors, airbagsSeatbelts, safetyComponents, compliance
//     } = req.body;

//     try {
//         const seller = await Seller.findOne({ 'cars._id': carId });
//         if (!seller) {
//             return res.status(404).send({ error: 'Seller or car not found' });
//         }

//         const inspectionDetails = {
//             paintCondition, dentsScratches, lightsCondition, bumpersMirrorsAlignment,
//             dashboardControls, seatsUpholstery, airConditioning, cleanliness,
//             engineCondition, transmissionFunctionality, leaksNoises, fluidLevels,
//             suspensionComponents, steeringAlignment, tiresCondition, brakePerformance,
//             brakePadsRotors, vibrationsNoises, batteryCondition, electricalComponents,
//             wiringConnectors, airbagsSeatbelts, safetyComponents, compliance
//         };

//         await mechanic.performInspection(seller._id, carId, inspectionDetails);

//         // Update the car inspection status and details in the seller's record
//         const car = seller.cars.id(carId);
//         car.inspect = true;
//         car.inspectionDetails = inspectionDetails;
//         await seller.save();

//         res.send({ success: 'Inspection completed successfully' });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// };



// const inspectCar = async (req, res) => {
//     const mechanic = req.user; // The authenticated mechanic
//     const { carId } = req.params;
//     const {
//         paintCondition, dentsScratches, lightsCondition, bumpersMirrorsAlignment,
//         dashboardControls, seatsUpholstery, airConditioning, cleanliness,
//         engineCondition, transmissionFunctionality, leaksNoises, fluidLevels,
//         suspensionComponents, steeringAlignment, tiresCondition, brakePerformance,
//         brakePadsRotors, vibrationsNoises, batteryCondition, electricalComponents,
//         wiringConnectors, airbagsSeatbelts, safetyComponents, compliance
//     } = req.body;

//     try {
//         const seller = await Seller.findOne({ 'cars._id': carId });
//         if (!seller) {
//             return res.status(404).send({ error: 'Seller or car not found' });
//         }

//         const inspectionDetails = {
//             paintCondition, dentsScratches, lightsCondition, bumpersMirrorsAlignment,
//             dashboardControls, seatsUpholstery, airConditioning, cleanliness,
//             engineCondition, transmissionFunctionality, leaksNoises, fluidLevels,
//             suspensionComponents, steeringAlignment, tiresCondition, brakePerformance,
//             brakePadsRotors, vibrationsNoises, batteryCondition, electricalComponents,
//             wiringConnectors, airbagsSeatbelts, safetyComponents, compliance
//         };

//         await mechanic.performInspection(seller._id, carId, inspectionDetails);

//         // Update the car inspection status and details in the seller's record
//         const car = seller.cars.id(carId);
//         car.inspect = true;
//         car.inspectionDetails = inspectionDetails;
//         await seller.save();

//         res.send({ success: 'Inspection completed successfully' });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// };

// module.exports = {
//     inspectCar,
// };


// module.exports = {
//     inspectCar,
// };





const Mechanic = require('../models/Mechanic');
const Seller = require('../models/Seller');
const inspectCar = async (req, res) => {
    const mechanic = req.user; // The authenticated mechanic
    const { carId } = req.params;

    const {
        exteriorCondition: {
            paintCondition, dentsScratches, lightsCondition, bumpersMirrorsAlignment
        },
        interiorCondition: {
            dashboardControls, seatsUpholstery, airConditioning, cleanliness
        },
        engineTransmission: {
            engineCondition, transmissionFunctionality, leaksNoises, fluidLevels
        },
        suspensionSteering: {
            suspensionComponents, steeringAlignment, tiresCondition
        },
        brakes: {
            brakePerformance, brakePadsRotors, vibrationsNoises
        },
        electricalSystem: {
            batteryCondition, electricalComponents, wiringConnectors
        },
        safetyFeatures: {
            airbagsSeatbelts, safetyComponents, compliance
        }
    } = req.body;

    // Log the received data
    console.log('Received Inspection Data:', req.body);

    try {
        const seller = await Seller.findOne({ 'cars._id': carId });
        if (!seller) {
            return res.status(404).send({ error: 'Seller or car not found' });
        }

        const inspectionDetails = {
            sellerId: seller._id,
            vehicleId: carId,
            paintCondition,
            dentsScratches,
            lightsCondition,
            bumpersMirrorsAlignment,
            dashboardControls,
            seatsUpholstery,
            airConditioning,
            cleanliness,
            engineCondition,
            transmissionFunctionality,
            leaksNoises,
            fluidLevels,
            suspensionComponents,
            steeringAlignment,
            tiresCondition,
            brakePerformance,
            brakePadsRotors,
            vibrationsNoises,
            batteryCondition,
            electricalComponents,
            wiringConnectors,
            airbagsSeatbelts,
            safetyComponents,
            compliance
        };

        // Log the inspection details before saving
        console.log('Inspection Details to be Saved:', inspectionDetails);

        mechanic.inspections.push(inspectionDetails);
        await mechanic.save();

        // Update the car inspection status and details in the seller's record
        const car = seller.cars.id(carId);
        car.inspect = true;
        car.inspectionDetails = inspectionDetails;
        await seller.save();

        res.send({ success: 'Inspection completed successfully' });
    } catch (error) {
        console.error('Error in inspectCar:', error);
        res.status(500).send({ error: error.message });
    }
};


module.exports = {
    inspectCar,
};
