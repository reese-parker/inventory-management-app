var express = require("express");
const res = require("express/lib/response");
var router = express.Router();

var game_controller = require("../controllers/gameController");

router.get("/", game_controller.listGamesGet);

router.get("/create", game_controller.createGameGet);

router.post("/create", game_controller.createGamePost);

router.get("/:id/update", game_controller.updateGameGet);

router.post("/:id/update", game_controller.updateGamePost);

router.get("/:id/delete", game_controller.deleteGameGet);

router.post("/:id/delete", game_controller.deleteGamePost);

router.get("/:id", game_controller.gameDetailsGet);

module.exports = router;
