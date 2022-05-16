var express = require("express");
const res = require("express/lib/response");
var router = express.Router();

var platform_controller = require("../controllers/platformController");

router.get("/", platform_controller.platform_list);

module.exports = router;
