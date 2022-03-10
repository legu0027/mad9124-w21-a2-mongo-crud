const {courses} = require('../data/courses.js')

const validateCourseId = (req, res, next) => {
  const id = parseInt(req.params.courseId);
  const index = courses.findIndex((course) => course.id === id);
  if (index<0) {
    res.status(404).json({
      errors: [
        {
          status: "404",
          title: "Resource does not exist",
          description: `We could not find a course with id: ${id}`,
        },
      ],
    });
  }
  req.courseIndex = index
  next()
}

module.exports = validateCourseId
