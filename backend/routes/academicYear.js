const express = require('express');
const router = express.Router();
const {getAcademicYear} = require('../controllers/academicYearController');

// GET /academicYear - Fetch all Academic Year
router.get('/', getAcademicYear);


module.exports = router;