var express = require("express");
var router = express.Router();

var platformController = require("../controllers/platformController");

router.get("/", platformController.listPlatformsGet);

router.get("/create", platformController.createPlatformGet);

router.post("/create", platformController.createPlatformPost);

router.get("/:id/update", platformController.updatePlatformGet);

router.post("/:id/update", platformController.updatePlatformPost);

router.get("/:id/delete", platformController.deletePlatformGet);

router.post("/:id/delete", platformController.deletePlatformPost);

router.get("/:id", platformController.platformDetailsGet);

module.exports = router;
