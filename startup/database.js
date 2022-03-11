const debug = require('debug')('mad9124-w21-a2-mongo-crud:db')
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/cListR_S2", {
    useNewUrlParser: true
  })
  .then(() => debug("Connected to MongoDB ..."))
  .catch((err) => {
    debug("Problem connecting to MongoDB ...", err.message);
    process.exit(1);
  });