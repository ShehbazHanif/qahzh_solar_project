const User = require('../models/auth');
const generateOTP = require('../utils/generateOtp');
const sendSms = require('../utils/sendSms'); // 🔁 changed from sendOTP

const checkUserVerifiedOrSendOtp = async (req, res, next) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ msg: 'Phone number required' });

  const user = await User.findOne({ phone });

  if (!user) return res.status(404).json({ msg: 'User not found. Please register first.' });

  // ✅ If user is verified, allow to proceed
  if (user.verified) {
    req.user = user;
    return next();
  }

  // ❌ Not verified → generate and send OTP
  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  const smsResult = await sendSms(phone, `Your OTP is ${otp}`);

  if (!smsResult.success) {
    return res.status(500).json({ msg: 'Failed to send OTP via SMS', error: smsResult.error });
  }

  return res.status(401).json({
    msg: 'Your number is not verified. OTP has been resent.',
    phone
  });
};

module.exports = checkUserVerifiedOrSendOtp;
