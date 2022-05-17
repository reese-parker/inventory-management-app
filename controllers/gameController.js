const { response } = require("../app");
var Game = require("../models/game");
var Platform = require("../models/platform");
var async = require("async");
const { body } = require("express-validator");
const res = require("express/lib/response");

// Read all games

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

// Read game

exports.game_detail = function (req, res, next) {
  Game.findById(req.params.id)
    .populate("platform")
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      console.log(results);
      res.render("game_detail", { game: results });
    });
};

// Create game form GET request

exports.game_create_get = function (req, res, next) {
  Platform.find().exec(function (err, list_platforms) {
    if (err) {
      return next(err);
    }
    res.render("game_form", {
      title: "Add game",
      game: undefined,
      platforms: list_platforms,
    });
  });
};

// Create game form POST request

exports.game_create_post = [
  body("name").trim(),
  body("description").trim(),
  function (req, res, next) {
    var game = new Game({
      name: req.body.name,
      platform: req.body.platform,
      description: req.body.description,
      release_date: req.body.release_date,
      price: req.body.price,
      stock: req.body.stock,
    });

    game.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(game.url);
    });
  },
];

// Update game form GET request

exports.game_update_get = function (req, res, next) {

  async.parallel({
    game_details : function(callback) { Game.findById(req.params.id).populate("platform").exec(callback)},
    platforms_list : function(callback) { Platform.find().exec(callback) } 
  },
  function (err, results) {
    if (err) {
      return next(err)
    }
    res.render("game_form", {
      title: `Update ${results.game_details.name} - ${results.game_details.platform.name}`,
      game: results.game_details,
      platforms: results.platforms_list,
    })
  })
};

// Update game POST request

exports.game_update_post = [
  body("name").trim(),
  body("description").trim(),
  function (req, res, next) {
    var updatedGame = new Game({
      name: req.body.name,
      platform: req.body.platform,
      description: req.body.description,
      release_date: req.body.release_date,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });

    Game.findByIdAndUpdate(
      req.params.id,
      updatedGame,
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

// Delete game GET request

exports.game_delete_get = function (req, res, next) {
  Game.findById(req.params.id).populate("platform").exec(function (err, results) {
    if (err) {
      return next(err);
    }
    res.render("game_delete", { game: results });
  });
};

// Delete game POST request

exports.game_delete_post = function (req, res, next) {
  Game.findByIdAndRemove(req.params.id, function(err) {
    if (err) {return next(err)}
    res.redirect("/games")
  })
}