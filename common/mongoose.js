const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.URL + process.env.DB_NAME, {
  useNewUrlParser: true
});

mongoose.connection.on("connected", () =>
  console.log("mongodb successfully connected")
);
mongoose.connection.on("error", err => console.log(err, "connection failed."));

module.exports = mongoose;
