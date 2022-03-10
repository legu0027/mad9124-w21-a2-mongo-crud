const {students} = require('../data/students.js')

const validateStudentId = (req, res, next) => {
  const id = parseInt(req.params.studentId);
  const index = students.findIndex((student) => student.id === id);
  if (index<0) {
    res.status(404).json({
      errors: [
        {
          status: "404",
          title: "Resource does not exist",
          description: `We could not find an student with id: ${id}`,
        },
      ],
    });
  }
  req.studentIndex = index
  next()
}

module.exports = validateStudentId
