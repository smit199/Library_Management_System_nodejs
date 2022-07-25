const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  address: String,
  userType: String,
  password: String,
  gender: String,
  regTime: { type: Date, default: new Date() },
});

module.exports = mongoose.model("users", userSchema);