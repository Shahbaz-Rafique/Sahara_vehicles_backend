const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    no: {
        type: String,
        required: true,
    },
    registeredIn: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    assembly: {
        type: String,
        required: true,
    },
    engineCapacity: {
        type: String,
        required: true,
    },
    bodyType: {
        type: String,
        required: true,
    },
    carType: {
        type: String,
        required: true,
    },
    additionalDetails: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
