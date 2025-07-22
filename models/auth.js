const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  password:{
    type:String
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String
  },
  otpExpires: {
    type: Date
  },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
