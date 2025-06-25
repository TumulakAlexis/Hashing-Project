const User = require('../models/user.js');
const Otp = require('../models/otp.js');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ TEMP FIX for self-signed certs
  },
}); 


// Send OTP and store hashed password temporarily
exports.sendOtp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    await Otp.create({ email, otp: otpCode, password: hashedPassword });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP is: <strong>${otpCode}</strong></p>`
    });

    res.status(200).json({ message: 'OTP sent to email' });

  } catch (err) {
    console.error('❌ OTP Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP and create user with hashed password
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) return res.status(400).json({ message: 'Invalid or expired OTP' });

    const newUser = new User({ email, password: validOtp.password });
    await newUser.save();

    await Otp.deleteMany({ email }); // Clean up OTPs after successful verification

    res.status(201).json({ message: 'Account created successfully' });

  } catch (err) {
    console.error('❌ OTP Verification Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login route
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
