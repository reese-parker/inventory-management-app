const { response } = require("../app");
var Platform = require("../models/platform");
var Game = require("../models/game");
var async = require("async");
const { body } = require("express-validator");


// Read all platforms

exports.platform_list = function (req, res, next) {
  Platform.find({}, "name").exec(function (err, list_platforms) {
    if (err) {
      return next(err);
    }
    res.render("platform_list", { platform_list: list_platforms });
  });
};

// Read platform

exports.platform_detail = function (req, res, next) {
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

// Create platform GET request

exports.platform_create_get = function (req, res, next) {
  res.render("platform_form")
}

// Create platform POST request

exports.platform_create_post = [
  body("name").trim(),
  body("description").trim(),
  function (req, res, next) {
    var platform = new Platform({
      name: req.body.name,
      description: req.body.description
    })

    platform.save(function(err) {
      if(err) {
        return next(err)
      }
      res.redirect(platform.url)
    })
  }
]