const { courses } = require("../data/courses.js");
const express = require("express");
const router = express.Router();
const validateCourseId = require("../middleware/validateCourseId.js");

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json({ data: courses });
});

router.get("/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
    if (!course) throw new Error('Resource not found')
    res.send({ data: course });
  } catch (err) {
    sendResourceNotFound(req, res)
  }
});

router.post("/",  async (req, res) => {
  const attributes = req.sanitizedBody;
    let newCourse = new Course(attributes);
    await newCourse.save();

  if (newCourse) {
    res.status(201).send({ data: newCourse });
  } else {
    res.status(400).json({
      errors: [
        {
          status: "400",
          title: "schema validation error",
          detail: `Some error happened, please try again`,
        },
      ],
    });
  }
});

router.put("/:courseId", async (req, res) => {
  try {
    const { _id, ...otherAttributes } = req.sanitizedBody;
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { _id: req.params.courseId, ...otherAttributes },
      {
        new: true,
        overwrite: true,
        runValidators: true,
      }
    );
    if (!course) throw new Error("Resource not found");
    res.send({ data: course });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.patch("/:courseId", async (req, res) => {
  try {
    const { _id, ...otherAttributes } = req.sanitizedBody;
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { _id: req.params.courseId, ...otherAttributes },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!course) throw new Error("Resource not found");
    res.send({ data: course });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.delete("/:courseId", async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.courseId);
    if (!course) throw new Error("Resource not found");
    res.send({ data: course });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
  
});


function formatResponseData(type, resource) {
  const { id, ...attributes } = resource;
  return { type, id, attributes };
}

function sendResourceNotFound(req, res) {
  res.status(404).send({
    errors: [
      {
        status: "404",
        title: "Resource does not exist",
        description: `We could not find a course with id: ${req.params.courseId}`,
      },
    ],
  });
}

module.exports = router;
