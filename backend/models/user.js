const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,

  resetToken: String,
  resetTokenExpires: Date,
});

module.exports = mongoose.model('User', userSchema);
