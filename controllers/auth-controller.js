const router = require("express").Router();
const httpResonse = require("../common/http-response");
const User = require("../models/user");
const authService = require("../services/auth-service");
const tokenManagement = require("../middleware/token");

router.post("/login", (req, res) => {
  authService
    .signIn(req.body)
    .then(user_info => {
      httpResonse.success(res, user_info);
    })
    .catch(error => {
      httpResonse.errorHandler(res, error);
    });
});

router.post("/register", (req, res) => {
  authService
    .register(req.body)
    .then(user_create => {
      httpResonse.success(res, user_create);
    })
    .catch(error => {
      httpResonse.errorHandler(res, error);
    });
});

module.exports = router;
