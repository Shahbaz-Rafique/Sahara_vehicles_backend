

// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const mechanicSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
   
//     inspections: [{
//         sellerId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Seller',
//             required: true,
//         },
//         vehicleId: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//         },


//             paintCondition: String,
//             dentsScratches: String,
//             lightsCondition: String,
//             bumpersMirrorsAlignment: String,
      
       
//             dashboardControls: String,
//             seatsUpholstery: String,
//             airConditioning: String,
//             cleanliness: String,
       
//             engineCondition: String,
//             transmissionFunctionality: String,
//             leaksNoises: String,
//             fluidLevels: String,
  
//             suspensionComponents: String,
//             steeringAlignment: String,
//             tiresCondition: String,
      
//             brakePerformance: String,
//             brakePadsRotors: String,
//             vibrationsNoises: String,
     
      
//             batteryCondition: String,
//             electricalComponents: String,
//             wiringConnectors: String,
     
//             airbagsSeatbelts: String,
//             safetyComponents: String,
//             compliance: String,
      
//     }],
//     tokens: [{
//         token: {
//             type: String,
//             required: true,
//         },
//     }],
// });

// mechanicSchema.methods.generateAuthToken = async function () {
//     const mechanic = this;
//     const token = jwt.sign({ _id: mechanic._id.toString() }, process.env.JWT_SECRET);
//     mechanic.tokens = mechanic.tokens.concat({ token });
//     await mechanic.save();
//     return token;
// };

// mechanicSchema.methods.performInspection = async function (sellerId, vehicleId, inspectionDetails) {
//     const mechanic = this;
//     const inspection = {
//         sellerId,
//         vehicleId,
//         ...inspectionDetails,
//     };
//     mechanic.inspections.push(inspection);
//     await mechanic.save();
// };

// const Mechanic = mongoose.model('Mechanic', mechanicSchema);

// module.exports = Mechanic;


// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const mechanicSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     inspections: [{
//         sellerId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Seller',
//             required: true,
//         },
//         vehicleId: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//         },
//         paintCondition: String,
//         dentsScratches: String,
//         lightsCondition: String,
//         bumpersMirrorsAlignment: String,
//         dashboardControls: String,
//         seatsUpholstery: String,
//         airConditioning: String,
//         cleanliness: String,
//         engineCondition: String,
//         transmissionFunctionality: String,
//         leaksNoises: String,
//         fluidLevels: String,
//         suspensionComponents: String,
//         steeringAlignment: String,
//         tiresCondition: String,
//         brakePerformance: String,
//         brakePadsRotors: String,
//         vibrationsNoises: String,
//         batteryCondition: String,
//         electricalComponents: String,
//         wiringConnectors: String,
//         airbagsSeatbelts: String,
//         safetyComponents: String,
//         compliance: String,
//     }],
//     tokens: [{
//         token: {
//             type: String,
//             required: true,
//         },
//     }],
// });

// mechanicSchema.methods.generateAuthToken = async function () {
//     const mechanic = this;
//     const token = jwt.sign({ _id: mechanic._id.toString() }, process.env.JWT_SECRET);
//     mechanic.tokens = mechanic.tokens.concat({ token });
//     await mechanic.save();
//     return token;
// };

// mechanicSchema.methods.performInspection = async function (sellerId, vehicleId, inspectionDetails) {
//     const mechanic = this;
//     const inspection = {
//         sellerId,
//         vehicleId,
//         ...inspectionDetails,
//     };
//     mechanic.inspections.push(inspection);
//     await mechanic.save();
// };

// const Mechanic = mongoose.model('Mechanic', mechanicSchema);

// module.exports = Mechanic;











// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const mechanicSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//    inspections: [{
//         sellerId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Seller',
//             required: true,
//         },
//         vehicleId: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//         },
//         paintCondition: String,
//         dentsScratches: String,
//         lightsCondition: String,
//         bumpersMirrorsAlignment: String,
//         dashboardControls: String,
//         seatsUpholstery: String,
//         airConditioning: String,
//         cleanliness: String,
//         engineCondition: String,
//         transmissionFunctionality: String,
//         leaksNoises: String,
//         fluidLevels: String,
//         suspensionComponents: String,
//         steeringAlignment: String,
//         tiresCondition: String,
//         brakePerformance: String,
//         brakePadsRotors: String,
//         vibrationsNoises: String,
//         batteryCondition: String,
//         electricalComponents: String,
//         wiringConnectors: String,
//         airbagsSeatbelts: String,
//         safetyComponents: String,
//         compliance: String,
//     }],
//     tokens: [{
//         token: {
//             type: String,
//             required: true,
//         },
//     }],
// });

// mechanicSchema.methods.generateAuthToken = async function () {
//     const mechanic = this;
//     const token = jwt.sign({ _id: mechanic._id.toString() }, process.env.JWT_SECRET);
//     mechanic.tokens = mechanic.tokens.concat({ token });
//     await mechanic.save();
//     return token;
// };

// mechanicSchema.methods.performInspection = async function (sellerId, vehicleId, inspectionDetails) {
//     const mechanic = this;
//     const inspection = {
//         sellerId,
//         vehicleId,
//         ...inspectionDetails,
//     };
//     mechanic.inspections.push(inspection);
//     await mechanic.save();
// };

// const Mechanic = mongoose.model('Mechanic', mechanicSchema);

// module.exports = Mechanic;
















// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const mechanicSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     inspections: [{
//         sellerId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Seller',
//             required: true,
//         },
//         vehicleId: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//         },
//         paintCondition: String,
//         dentsScratches: String,
//         lightsCondition: String,
//         bumpersMirrorsAlignment: String,
//         dashboardControls: String,
//         seatsUpholstery: String,
//         airConditioning: String,
//         cleanliness: String,
//         engineCondition: String,
//         transmissionFunctionality: String,
//         leaksNoises: String,
//         fluidLevels: String,
//         suspensionComponents: String,
//         steeringAlignment: String,
//         tiresCondition: String,
//         brakePerformance: String,
//         brakePadsRotors: String,
//         vibrationsNoises: String,
//         batteryCondition: String,
//         electricalComponents: String,
//         wiringConnectors: String,
//         airbagsSeatbelts: String,
//         safetyComponents: String,
//         compliance: String,
//     }],
//     tokens: [{
//         token: {
//             type: String,
//             required: true,
//         },
//     }],
// });

// mechanicSchema.methods.generateAuthToken = async function () {
//     const mechanic = this;
//     const token = jwt.sign({ _id: mechanic._id.toString() }, process.env.JWT_SECRET);
//     mechanic.tokens = mechanic.tokens.concat({ token });
//     await mechanic.save();
//     return token;
// };

// mechanicSchema.methods.performInspection = async function (sellerId, vehicleId, inspectionDetails) {
//     const mechanic = this;
//     const inspection = {
//         sellerId,
//         vehicleId,
//         ...inspectionDetails,
//     };
//     mechanic.inspections.push(inspection);
//     await mechanic.save();
// };

// const Mechanic = mongoose.model('Mechanic', mechanicSchema);

// module.exports = Mechanic;







const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const InspectionSchema = new Schema({
    sellerId: { type: Schema.Types.ObjectId, required: true },
    vehicleId: { type: Schema.Types.ObjectId, required: true },
    paintCondition: String,
    dentsScratches: String,
    lightsCondition: String,
    bumpersMirrorsAlignment: String,
    dashboardControls: String,
    seatsUpholstery: String,
    airConditioning: String,
    cleanliness: String,
    engineCondition: String,
    transmissionFunctionality: String,
    leaksNoises: String,
    fluidLevels: String,
    suspensionComponents: String,
    steeringAlignment: String,
    tiresCondition: String,
    brakePerformance: String,
    brakePadsRotors: String,
    vibrationsNoises: String,
    batteryCondition: String,
    electricalComponents: String,
    wiringConnectors: String,
    airbagsSeatbelts: String,
    safetyComponents: String,
    compliance: String
});





const mechanicSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    inspections: [InspectionSchema],
    tokens: [{ token: { type: String, required: true } }]
});


mechanicSchema.methods.generateAuthToken = async function () {
    const mechanic = this;
    const token = jwt.sign({ _id: mechanic._id.toString() }, process.env.JWT_SECRET);
    mechanic.tokens = mechanic.tokens.concat({ token });
    await mechanic.save();
    return token;
};

mechanicSchema.methods.performInspection = async function (sellerId, vehicleId, inspectionDetails) {
    const mechanic = this;
    const inspection = {
        sellerId,
        vehicleId,
        ...inspectionDetails,
    };
    mechanic.inspections.push(inspection);
    await mechanic.save();
};

const Mechanic = mongoose.model('Mechanic', mechanicSchema);
module.exports = Mechanic;