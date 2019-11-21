const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const eventController = require("./controllers/event-controller");

router.use("/auth", authController);
router.use("/event", eventController);

module.exports = router;
