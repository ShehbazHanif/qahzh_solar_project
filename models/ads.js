const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  linkType: {
    type: String,
    enum: ['internal', 'external'],
    required: true
  },
  externalUrl: { type: String }, // full URL (if external)
  placement: {
    type: String,
    enum: ['homepage', 'marketplace', 'calculator', 'engineerPage', 'offersTab'],
    required: true
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', adSchema);
