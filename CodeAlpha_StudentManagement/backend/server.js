const express = require('express');
const cors = require('cors');
require('dotenv').config();
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Student Management System API',
        version: '1.0.0',
        status: 'running'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API Documentation:`);
    console.log(`  GET    http://localhost:${PORT}/api/students`);
    console.log(`  GET    http://localhost:${PORT}/api/students/:id`);
    console.log(`  POST   http://localhost:${PORT}/api/students`);
    console.log(`  PUT    http://localhost:${PORT}/api/students/:id`);
    console.log(`  DELETE http://localhost:${PORT}/api/students/:id`);
    console.log(`========================================\n`);
});

module.exports = app;
