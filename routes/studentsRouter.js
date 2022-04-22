const Student = require("../models/Student");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const students = await Student.find();
  // res.json({ data: students.map((student) => formatResponseData("students", student)) });
  res.send({ data: students });
});

router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId)
    if (!student) throw new Error('Resource not found')
    res.send({ data: student });
  } catch (err) {
    sendResourceNotFound(req, res)
  }
  
});

router.post("/", async (req, res) => {
  const attributes = req.body;

    let newStudent = new Student(attributes);
    await newStudent.save();

  if (newStudent) {
    res.status(201).send({ data: newStudent });
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

router.put("/:studentId", async (req, res) => {
  try {
    const { _id, ...otherAttributes } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      { _id: req.params.studentId, ...otherAttributes },
      {
        new: true,
        overwrite: true,
        runValidators: true,
      }
    );
    if (!student) throw new Error("Resource not found");
    res.send({ data: student });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
});

router.patch("/:studentId", async (req, res) => {
  try {
    const { _id, ...otherAttributes } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      { _id: req.params.studentId, ...otherAttributes },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!student) throw new Error("Resource not found");
    res.send({ data: student });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
  
});

router.delete("/:studentId", async (req, res) => {
  try {
    const student = await Car.findByIdAndRemove(req.params.studentId);
    if (!student) throw new Error("Resource not found");
    res.send({ data: student });
  } catch (err) {
    sendResourceNotFound(req, res);
  }
  
});

function sendResourceNotFound(req, res) {
  res.status(404).send({
    errors: [
      {
        status: "404",
        title: "Resource does not exist",
        description: `We could not find a student with id: ${req.params.studentId}`,
      },
    ],
  });
}

module.exports = router;
