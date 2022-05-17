var express = require("express");
const res = require("express/lib/response");
var router = express.Router();

var game_controller = require("../controllers/gameController");

router.get("/", game_controller.game_list);

router.get("/create", game_controller.game_create_get);

router.post("/create", game_controller.game_create_post);

router.get("/:id", game_controller.game_detail);

module.exports = router;
