const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/students');
const coursesRoutes = require('./routes/courses');
const academicYearRoutes = require('./routes/academicYear');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://quyl-app-ashmit-ny79ceuzx-ashmit-sharmas-projects-8aed11fd.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());

// Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Student Routes
app.use('/api/students', studentRoutes);

// Courses Routes
app.use('/api/courses', coursesRoutes);

// Academic Year Routes
app.use('/api/academicyears', academicYearRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: err.message
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
