const User = require('../models/auth');
const bcrypt = require('bcrypt');
const generateOtp = require('../utils/generateOtp');
const sendMail = require('../utils/mailingService');
const generateToken = require('../utils/generateToken');



// Register + Send OTP (for new users)
const register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      status: 400,
      data: [],
      msg: 'All fields are required'
    });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        data: [],
        msg: 'User already exists with this email'
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate OTP and expiry
    const otp = generateOtp(); // e.g., 6-digit random
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Create user
    const user = new User({
      name,
      email,
      phone,
      password: hashPassword,
      otp,
      otpExpires
    });

    await user.save();

    // Send OTP via email
    const subject = 'Qafzh Solar - Your OTP Code';
    const content = `<p>Your OTP code is: <strong>${otp}</strong></p>`;
    const mailResult = await sendMail(email, subject, content);

    if (!mailResult.accepted.length) {
      return res.status(500).json({
        status: 500,
        data: [],
        msg: 'Failed to send OTP email'
      });
    }

    return res.status(201).json({
      status: 201,
      data: { email, phone },
      msg: 'User registered successfully. Please verify your email using OTP.'
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      data: [],
      msg: 'Server error during registration'
    });
  }
};


// Request OTP (for existing users)


// Verify OTP and return token
const  verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ 
        status:400,
        data:[],
        msg: 'Invalid or expired OTP' });
  }

  user.verified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();
  res.status(200).json({
    status:200,
    data:[],
    msg: 'OTP verified' });
};

// login user

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate fields
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      msg: 'Email and password are required'
    });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        msg: 'User not found'
      });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        msg: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user);

    // Send response
    return res.status(200).json({
      status: 200,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      },
      msg: 'Login successful'
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      msg: 'Server error during login'
    });
  }
};

const authController ={
    register,
    verifyOTP,
    login
};

module.exports = authController;
