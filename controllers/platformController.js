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
  res.render("platform_form", { title: "Add platform", platform: undefined });
};

// Create platform POST request

exports.platform_create_post = [
  body("name").trim(),
  body("description").trim(),
  function (req, res, next) {
    var platform = new Platform({
      name: req.body.name,
      description: req.body.description,
    });

    platform.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(platform.url);
    });
  },
];

// Update platform GET request

exports.platform_update_get = async function (req, res, next) {
  var platform_details = await Platform.findById(req.params.id);
  res.render("platform_form", {
    title: "Update platform",
    platform: platform_details,
  });
};

// Update platform POST request

exports.platform_update_post = [
  body("name").trim(),
  body("description").trim(),
  function (req, res, next) {
    var updatedPlatform = new Platform({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    Platform.findByIdAndUpdate(
      req.params.id,
      updatedPlatform,
      {},
      function (err, results) {
        if (err) {
          return next(err);
        }
        res.redirect(results.url);
      }
    );
  },
];
