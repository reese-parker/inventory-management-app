var express = require("express");
var router = express.Router();

var gameController = require("../controllers/gameController");

router.get("/", gameController.listGamesGet);

router.get("/create", gameController.createGameGet);

router.post("/create", gameController.createGamePost);

router.get("/:id/update", gameController.updateGameGet);

router.post("/:id/update", gameController.updateGamePost);

router.get("/:id/delete", gameController.deleteGameGet);

router.post("/:id/delete", gameController.deleteGamePost);

router.get("/:id", gameController.gameDetailsGet);

module.exports = router;
