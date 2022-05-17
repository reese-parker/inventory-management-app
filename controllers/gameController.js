const { response } = require("../app");
var Game = require("../models/game");
var Platform = require("../models/platform");
var async = require("async");
const { body } = require("express-validator");

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

exports.game_update_get = async function (req, res, next) {
  var game_details = await Game.findById(req.params.id);
  var list_platforms = await Platform.find();
  res.render("game_form", {
    title: "Update game",
    game: game_details,
    platforms: list_platforms,
  });
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
