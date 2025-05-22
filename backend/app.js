const express = require('express');
const cors = require('cors');

const { createConnection } = require('typeorm');
const authRoutes = require('./routes/authRoutes');
const softwareRoutes = require('./routes/softwareRoutes');
const requestRoutes = require('./routes/requestRoutes');
const databaseConfig = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

// Database connection
createConnection(databaseConfig)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;