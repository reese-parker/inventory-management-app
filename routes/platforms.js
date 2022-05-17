var express = require("express");
const res = require("express/lib/response");
var router = express.Router();

var platform_controller = require("../controllers/platformController");

router.get("/", platform_controller.platform_list);

router.get("/create", platform_controller.platform_create_get);

router.post("/create", platform_controller.platform_create_post);

router.get("/:id/update", platform_controller.platform_update_get)

router.post("/:id/update", platform_controller.platform_update_post)

router.get("/:id", platform_controller.platform_detail);

module.exports = router;
