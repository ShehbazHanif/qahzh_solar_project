const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // Anonymous user until they register/verify
  },
  name: {
    type: String,
    required: true,
    trim: true
  },

  type: {
    type: String,
    enum: ['Inverter', 'Panel', 'Battery', 'Accessory'],
    required: true
  },

  condition: {
    type: String,
    enum: ['New', 'Used', 'Needs Repair'],
    required: true
  },

  brand: {
    type: String,
    default: 'Unknown'
  },

  price: {
    type: Number,
    required: true
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

  locationText: {
    type: String,
    default: ''
  },

  images: [
    {
      type: String,
      // If using Cloudinary or external storage
    }
  ],



  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },


  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
