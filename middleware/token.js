const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const boom = require("boom");

const tokenManagement = {
  verifyToken(req, res, next) {
    if (!req.header("authorization")) {
      return res.send(boom.unauthorized("Token Required"));
    }

    let token = req.headers["authorization"];

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .send(
            boom.forbidden(
              "The token supplied to the request is invalid.Please try with valid token."
            )
          );
      }
      req.user = decoded;
      next();
    });
  },

  generateToken(user) {
    console.log("env", SECRET);
    let expiresIn = 86400; //expires in 24 hours
    let token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      },
      "superscret",
      {
        expiresIn: expiresIn
      }
    );
    return { auth: true, token: token, user: user };
  }
};

module.exports = tokenManagement;
