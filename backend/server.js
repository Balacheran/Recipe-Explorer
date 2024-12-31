const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/connectionDb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDb();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/user'));
app.use('/recipes', require('./routes/recipe')); // Ensure the route is /recipes

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`App is listening on port ${PORT}`);
  }
});
