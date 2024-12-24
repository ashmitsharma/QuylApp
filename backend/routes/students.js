const express = require('express');
const router = express.Router();
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentsController');

// GET /students - Fetch all students
router.get('/', getStudents);

// POST /students - Add a new student
router.post('/', addStudent);

// PUT /students/:id - Update a student by ID
router.put('/:id', updateStudent);

// DELETE /students/:id - Delete a student by ID
router.delete('/:id', deleteStudent);

module.exports = router;
