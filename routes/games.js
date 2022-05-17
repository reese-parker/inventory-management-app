var express = require("express");
const res = require("express/lib/response");
var router = express.Router();

var game_controller = require("../controllers/gameController");

router.get("/", game_controller.game_list);

router.get("/:id", game_controller.game_detail);

module.exports = router;
