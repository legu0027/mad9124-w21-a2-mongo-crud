const { courses } = require("../data/courses.js");
const express = require("express");
const router = express.Router();
const validateCourseId = require("../middleware/validateCourseId.js");

router.use("/:courseId", validateCourseId);

router.get("/", (req, res) => {
  res.json({ data: courses.map((course) => formatResponseData("courses", course)) });
});

router.get("/:courseId", (req, res) => {
  res.json({ data: formatResponseData("courses", courses[req.courseIndex]) });
});

router.post("/", (req, res) => {
  const { data } = req.body;
  if (data?.type === "courses") {
    const newcourse = {
      ...data.attributes,
      id: Date.now(),
    };
    courses.push(newcourse);
    res.status(201).json({ data: formatResponseData("courses", newcourse) });
  } else {
    res.status(400).json({
      errors: [
        {
          status: "400",
          title: "schema validation error",
          detail: `Expected resource type to be 'courses', got '${data?.type}'`,
          source: {
            pointer: "/data/type",
          },
        },
      ],
    });
  }
});

router.put("/:courseId", (req, res) => {
  const id = parseInt(req.params.courseId);

  const updatedcourse = {
    ...req.body?.data?.attributes,
    id,
  };
  courses[req.courseIndex] = updatedcourse;
  res.json({ data: formatResponseData("courses", updatedcourse) });
});

router.patch("/:courseId", (req, res) => {
  const id = parseInt(req.params.courseId);

  // process request
  const updatedcourse = Object.assign(
    {},
    courses[req.courseIndex],
    req.body?.data?.attributes,
    { id }
  );
  courses[req.courseIndex] = updatedcourse;
  res.json({ data: formatResponseData("cars", updatedcourse) });
});

router.delete("/:courseId", (req, res) => {
  const id = parseInt(req.params.courseId);
  const deletedcourse = courses.splice(req.courseIndex, 1)[0];
  res.json({
    data: formatResponseData("courses", deletedcourse),
    meta: { message: `course with id: ${id} successfully deleted.` },
  });
});


function formatResponseData(type, resource) {
  const { id, ...attributes } = resource;
  return { type, id, attributes };
}

module.exports = router;
