const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch all students
exports.getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();

    // Flatten the courses arrays into a unique set
    const uniqueCourses = [
      ...new Set(students.flatMap((s) => s.courses)),
    ];
    const uniqueYears = [...new Set(students.map((s) => s.cohort))];

    res.status(200).json({
      students,
      dropdowns: {
        courses: uniqueCourses,
        years: uniqueYears,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new student
exports.addStudent = async (req, res) => {
  const { name, cohort, courses, dateJoined, lastLogin, status } = req.body;

  try {
    const newStudent = await prisma.student.create({
      data: { name, cohort, courses, dateJoined, lastLogin, status },
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update an existing student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, cohort, courses, dateJoined, lastLogin, status } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: { name, cohort, courses, dateJoined, lastLogin, status },
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.student.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
