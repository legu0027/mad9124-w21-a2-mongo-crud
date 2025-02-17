// Don't forget to use NPM to install Express and Mongoose.
'use strict'
// load dependencies

const debug = require('debug')('mad9124-w21-a2-mongo-crud')

require('./startup/database')



const morgan = require('morgan')
const express = require('express')
const studentsRouter = require('./routes/studentsRouter.js')
const coursesRouter = require('./routes/coursesRouter.js')
const sanitizeBody = require('./middleware/sanitizeBody')
const sanitizeMongo = require('express-mongo-sanitize')

// create the express app
const app = express()

// configure express middleware
app.use(morgan('tiny'))
app.use(express.json())

app.use('/', sanitizeBody)
app.use(sanitizeMongo())



// define routes
app.use('/api/students', studentsRouter)
app.use('/api/courses', coursesRouter)


// start listening for HTTP requests
const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))
