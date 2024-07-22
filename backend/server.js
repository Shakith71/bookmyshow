const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
const userRoutes = require('./routes/userRoutes'); // Import routes

const app = express();
const port = process.env.PORT || 5000; // Default to port 5000 if PORT is not set in .env

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api', userRoutes); // Prefix all routes with /api

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
