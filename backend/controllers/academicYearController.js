const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAcademicYear = async (req, res) => {
    try {
        const years = await prisma.academicYear.findMany();
        res.status(200).json(years);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };