const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.URL)
mongoose.connect(process.env.URL, {
  useNewUrlParser: true, useUnifiedTopology: true
});

mongoose.connection.on("connected", () =>
  console.log("mongodb successfully connected")
);
mongoose.connection.on("error", err => console.log(err, "connection failed."));

module.exports = mongoose;
