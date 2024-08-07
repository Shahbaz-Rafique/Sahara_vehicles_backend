// models/Purchase.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentStatus: { type: String, required: true },
    itemName: { type: String, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    itemImageUrl: { type: String, required: true },
    itemAmount: { type: Number, required: true },
    itemQuantity: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
