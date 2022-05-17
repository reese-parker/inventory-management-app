const { response } = require("../app");
var Game = require("../models/game");

exports.game_list = function (req, res, next) {
  Game.find({}, "name platform")
    .populate("platform")
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("game_list", { game_list: results });
    });
};

exports.game_detail = function (req, res, next) {
  Game.findById(req.params.id)
    .populate("platform")
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      console.log(results)
      res.render("game_detail", { game: results });
    });
};
