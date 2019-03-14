var router = require("express").Router();
var apiRoutes = require("./api");
var htmlRoutes = require("./html");

router.use("/", apiRoutes);
router.use("/", htmlRoutes);

module.exports = router;
