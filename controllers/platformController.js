var Platform = require("../models/platform");
var Game = require("../models/game");
var async = require("async");
const { body } = require("express-validator");

// Create platform GET request

exports.createPlatformGet = function (req, res, next) {
  res.render("platform_form", { title: "Add platform", platform: undefined });
};

// Create platform POST request

exports.createPlatformPost = [
  body("name").trim(),
  body("description").trim(),
  function (req, res, next) {
    var platform = new Platform({
      name: req.body.name,
      description: req.body.description,
    });

    platform.save(function (error) {
      if (error) {
        return next(error);
      }
      res.redirect(platform.url);
    });
  },
];

// Read all platforms

exports.listPlatformsGet = function (req, res, next) {
  Platform.find({}, "name").exec(function (error, platforms) {
    if (error) {
      return next(error);
    }
    res.render("platform_list", { platforms: platforms });
  });
};

// Read platform

exports.platformDetailsGet = function (req, res, next) {
  async.parallel(
    {
      platform: function (callback) {
        Platform.findById(req.params.id).exec(callback);
      },
      games: function (callback) {
        Game.find({ platform: req.params.id }).exec(callback);
      },
    },
    function (error, results) {
      if (error) {
        return next(error);
      }
      res.render("platform_detail", {
        platform: results.platform,
        games: results.games,
      });
    }
  );
};

// Update platform GET request

exports.updatePlatformGet = function (req, res, next) {
  Platform.findById(req.params.id).exec(function (error, platform) {
    if (error) {
      return next(error);
    }
    res.render("platform_form", {
      title: "Update platform",
      platform: platform,
    });
  });
};

// Update platform POST request

exports.updatePlatformPost = [
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
      function (error, platform) {
        if (error) {
          return next(error);
        }
        res.redirect(platform.url);
      }
    );
  },
];

// Delete platform GET request

exports.deletePlatformGet = function (req, res, next) {
  async.series(
    {
      platform: function (callback) {
        Platform.findById(req.params.id).exec(callback);
      },
      games: function (callback) {
        Game.find({ platform: req.params.id }).exec(callback);
      },
    },
    function (error, results) {
      if (error) {
        return next(error);
      }
      res.render("platform_delete", {
        platform: results.platform,
        games: results.games,
      });
    }
  );
};

// Delete platform POST request

exports.deletePlatformPost = function (req, res, next) {
  Platform.findByIdAndRemove(req.params.id, function (error) {
    if (error) {
      return next(error);
    }
    res.redirect("/platforms");
  });
};
