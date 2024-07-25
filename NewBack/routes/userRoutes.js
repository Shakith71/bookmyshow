// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt')

// Get all users

router.post('/userLogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        suc: false,
        message: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({
        suc: true,
        userId: user._id
      });
    } else {
      res.json({
        suc: false,
        message: 'Incorrect password'
      });
    }
  } catch (err) {
    res.status(500).json({
      suc: false,
      message: 'Error retrieving users',
      error: err.message
    });
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  
  try {
    const salt = await bcrypt.genSalt();
    user.salt = salt
    user.password = await bcrypt.hash(user.password, salt)
    const savedUser = await user.save();
    req.session.userId = savedUser._id; // Store the user ID in the session
    res.status(201).json(savedUser); // Return the created user object
  } catch (err) {   
    res.status(400).send('Error creating user: ' + err);
  }
});


// Get a specific user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.params.id)
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send('Error retrieving user: ' + err);
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send('Error updating user: ' + err);
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send('Error deleting user: ' + err);
  }
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    if (req.session.authenticated) {
      return res.json(req.session);
    } else {
      // Replace this with actual user lookup and password hash verification
      // const user = await User.findOne({ username });
      // if (user && await bcrypt.compare(password, user.passwordHash)) {
      if (password === '123') { // Placeholder for demonstration
        req.session.authenticated = true;
        req.session.user = { username }; // Do not store password in session
        return res.json(req.session);
      } else {
        return res.status(403).json({ msg: 'Bad credentials' });
      }
    }
  } else {
    return res.status(403).json({ msg: 'Bad credentials' });
  }
});
router.get('/profile', (req, res) => {
  
    res.json({ message: 'Profile page', user: req.session.user });
  
});


module.exports = router;
