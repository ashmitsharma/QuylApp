const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/students');
const coursesRoutes = require('./routes/courses');
const academicYearRoutes = require('./routes/academicYear');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Student Routes
app.use('/students', studentRoutes);

// Courses Routes
app.use('/courses', coursesRoutes);

// Academic Year Routes
app.use('/academicyears', academicYearRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
