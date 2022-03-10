const { students } = require("../data/students.js");
const express = require("express");
const router = express.Router();
const validateStudentId = require("../middleware/validateStudentId.js");

router.use("/:studentId", validateStudentId);

router.get("/", (req, res) => {
  res.json({ data: students.map((student) => formatResponseData("students", student)) });
});

router.get("/:studentId", (req, res) => {
  res.json({ data: formatResponseData("students", students[req.studentIndex]) });
});

router.post("/", (req, res) => {
  const { data } = req.body;
  if (data?.type === "students") {
    const newStudent = {
      ...data.attributes,
      id: Date.now(),
    };
    students.push(newStudent);
    res.status(201).json({ data: formatResponseData("students", newStudent) });
  } else {
    res.status(400).json({
      errors: [
        {
          status: "400",
          title: "schema validation error",
          detail: `Expected resource type to be 'students', got '${data?.type}'`,
          source: {
            pointer: "/data/type",
          },
        },
      ],
    });
  }
});

router.put("/:studentId", (req, res) => {
  const id = parseInt(req.params.studentId);

  const updatedStudent = {
    ...req.body?.data?.attributes,
    id,
  };
  students[req.studentIndex] = updatedStudent;
  res.json({ data: formatResponseData("students", updatedStudent) });
});

router.patch("/:studentId", (req, res) => {
  const id = parseInt(req.params.studentId);

  // process request
  const updatedStudent = Object.assign(
    {},
    students[req.studentIndex],
    req.body?.data?.attributes,
    { id }
  );
  students[req.studentIndex] = updatedStudent;
  res.json({ data: formatResponseData("cars", updatedStudent) });
});

router.delete("/:studentId", (req, res) => {
  const id = parseInt(req.params.studentId);
  const deletedStudent = students.splice(req.studentIndex, 1)[0];
  res.json({
    data: formatResponseData("students", deletedStudent),
    meta: { message: `Student with id: ${id} successfully deleted.` },
  });
});


function formatResponseData(type, resource) {
  const { id, ...attributes } = resource;
  return { type, id, attributes };
}

module.exports = router;
