const mongoose = require('mongoose');

const verifiedShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    governorate: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    services: {
        type: [String],
        enum: ['sale', 'install', 'repair'],
        required: true
    },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Shop', verifiedShopSchema);
