const mongoose = require('mongoose');

const engineerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    services: {
        type: [String],
        enum: ['Install', 'Repair'],
        required: true
    },
    governorate: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Engineer', engineerSchema);
