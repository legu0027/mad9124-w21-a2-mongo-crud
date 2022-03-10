// Don't forget to use NPM to install Express and Mongoose.
'use strict'
// load dependencies

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/cListR_S2", {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => {
    console.error("Problem connecting to MongoDB ...", err.message);
    process.exit(1);
  });

  



const morgan = require('morgan')
const express = require('express')
const studentsRouter = require('./routes/studentsRouter.js')
const coursesRouter = require('./routes/coursesRouter.js')

// create the express app
const app = express()

// configure express middleware
app.use(morgan('tiny'))
app.use(express.json())



// define routes
app.use('/api/students', studentsRouter)
app.use('/api/courses', coursesRouter)


// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))
