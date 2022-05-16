const { response } = require("../app");
var Platform = require("../models/platform");
var Game = require("../models/game");

exports.game_list = function (req, res, next) {
  Game.find({}, "name platform")
    .populate("platform")
    .exec(function (err, list_games) {
      if (err) {
        return next(err);
      }
      console.log(list_games);
      res.render("game_list", { game_list: list_games });
    });
};
