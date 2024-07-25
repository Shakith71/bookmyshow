// models/User.js
const mongoose = require('mongoose');

// Define schema
const UserSchema = new mongoose.Schema({
  
  email: String,
  password: String,
  salt:String

});

// Create and export model
const User = mongoose.model('User', UserSchema);
module.exports = User;
