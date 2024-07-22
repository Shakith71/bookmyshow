// models/User.js
const mongoose = require('mongoose');

// Define schema
const UserSchema = new mongoose.Schema({
  userid: Number,
  name: String,
  moviename: String,
  theatrename: String,
  contactno: String,
  ticket_count: Number,
});

// Create and export model
const User = mongoose.model('User', UserSchema);
module.exports = User;
