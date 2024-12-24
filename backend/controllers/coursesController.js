const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getCourses = async (req, res) => {
    try {
      const courses = await prisma.course.findMany();
      res.status(200).json(courses);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };