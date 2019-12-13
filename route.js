const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const eventController = require("./controllers/event-controller");
const serviceController = require('./controllers/service-controller');

router.use('/', (req, res) => {
    res.json({
        message: "Welcome to model craft Server"
    })
})

router.use("/auth", authController);
router.use("/event", eventController);
router.use('/service', serviceController);

module.exports = router;
