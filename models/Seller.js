const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cars: [{
        grade: String,
        make: String,
        model: String,
        year: Number,
        mileage: Number,
        images: [String],
        price:String,
        location:String,
        comments: String,
        inspect: {
            type: Boolean,
            default: false, // Default value can be set as per requirement
        },  inspectionDetails: {
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
            compliance: String,
        },
    }],
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
});

sellerSchema.methods.generateAuthToken = async function () {
    const seller = this;
    const token = jwt.sign({ _id: seller._id.toString() }, process.env.JWT_SECRET);
    seller.tokens = seller.tokens.concat({ token });
    await seller.save();
    return token;
};

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;
