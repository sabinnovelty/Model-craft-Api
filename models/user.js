var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    defaultValue: "admin"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
