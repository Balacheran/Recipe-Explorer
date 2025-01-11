const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/connectionDb');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDb();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/', require('./routes/user'));
app.use('/recipes', require('./routes/recipe'));
app.use('/', require('./routes/comment'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`App is listening on port ${PORT}`);
    }
});