const { response } = require("../app");
var Platform = require("../models/platform");
var Game = require("../models/game");
var async = require("async");

exports.platform_list = function (req, res, next) {
  Platform.find({}, "name").exec(function (err, list_platforms) {
    if (err) {
      return next(err);
    }
    res.render("platform_list", { platform_list: list_platforms });
  });
};

exports.platform_detail = async function (req, res, next) {
  async.parallel(
    {
      platform: function (callback) {
        Platform.findById(req.params.id).exec(callback);
      },
      games: function (callback) {
        Game.find({ platform: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("platform_detail", {
        platform: results.platform,
        games: results.games,
      });
    }
  );
};
