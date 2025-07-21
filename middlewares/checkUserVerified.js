const User = require('../models/auth');
const generateOTP = require('../utils/generateOtp');
const sendMail = require('../utils/mailingService'); //  Using mailing instead of SMS

const checkUserVerified = async (req, res, next) => {
  console.log(req.body);
  const productData = req.body;

  const { phone } = req.body;

  console.log("Phone:", phone);

  if (!phone) {
    return res.status(400).json({ msg: 'phone is required' });
  }

  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(404).json({ msg: 'User not found. Please register first.' });
  }

  if (user.verified) {
    req.user = user;
        req.productData = productData;
    return next();
  }

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  const subject = 'Verify Your Email - OTP';
  const htmlContent = `
    <p>Hello,</p>
    <p>Your OTP is <strong>${otp}</strong>.</p>
    <p>This OTP will expire in 5 minutes.</p>
  `;

  const result = await sendMail(user.email, subject, htmlContent);

  if (result.accepted?.includes(user.email)) {
    return res.status(401).json({
      msg: 'Email is not verified. OTP has been sent.',
      email: user.email
    });
  } else {
    return res.status(500).json({
      msg: 'Failed to send OTP via Email',
      error: result.error || 'Unknown error'
    });
  }
};


module.exports = { checkUserVerified };
