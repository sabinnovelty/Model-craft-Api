var authService = (() => {
  const bcrypt = require("bcrypt");
  const HttpStatus = require("http-status-codes");
  const result = require("dotenv").config();
  const { parsed: envs } = result;
  const generateToken = require("../middleware/token").generateToken;
  const User = require("../models/user");

  signIn = user => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(user)
        const user_info = await User.findOne({ email: user.email });
        if (!user_info) {
          reject({ message: "Authentication failed!" });
        }
        if (user.password !== user_info.password) {
          reject({ message: "Authentication failed!" });
        }
        const token = generateToken(user_info);
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  };

  register = user => {
    return new Promise(async (resolve, reject) => {
      try {
        const new_user = new User({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password
        });
        const user_create = await new_user.save();
        resolve(user_create);
      } catch (error) {
        reject(error);
      }
    });
  };

  forgotPassword = model => { };

  return {
    signIn: signIn,
    register: register
  };
})();

module.exports = authService;
