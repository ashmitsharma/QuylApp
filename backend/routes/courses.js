const express = require('express');
const router = express.Router();
const {getCourses} = require('../controllers/coursesController');

// GET /courses - Fetch all courses
router.get('/', getCourses);


module.exports = router;