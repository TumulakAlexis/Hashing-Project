const User = require('../models/user.js');
const Otp = require('../models/otp.js');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOtp = async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedPassword = await bcrypt.hash(password, 10);

  await Otp.create({ email, otp: otpCode });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is: <strong>${otpCode}</strong></p>`
  });

  res.json({ message: 'OTP sent to email', email, password: hashedPassword });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp, password } = req.body;

  const validOtp = await Otp.findOne({ email, otp });
  if (!validOtp) return res.status(400).json({ message: 'Invalid OTP' });

  const user = new User({ email, password });
  await user.save();
  await Otp.deleteMany({ email });

  res.json({ message: 'Account created successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

  res.json({ message: 'Login successful' });
};
