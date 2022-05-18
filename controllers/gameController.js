var Game = require("../models/game");
var Platform = require("../models/platform");
var async = require("async");
const { body } = require("express-validator");

// Create game form GET request

exports.createGameGet = function (req, res, next) {
  Platform.find().exec(function (error, platforms) {
    if (error) {
      return next(error);
    }
    res.render("game_form", {
      title: "Add game",
      game: undefined,
      platforms: platforms,
    });
  });
};

// Create game form POST request

exports.createGamePost = [
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
    game.save(function (error) {
      if (error) {
        return next(error);
      }
      res.redirect(game.url);
    });
  },
];

// Read all games

exports.listGamesGet = function (req, res, next) {
  Game.find({}, "name platform")
    .populate("platform")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      res.render("game_list", { games: results });
    });
};

// Read game

exports.gameDetailsGet = function (req, res, next) {
  Game.findById(req.params.id)
    .populate("platform")
    .exec(function (error, results) {
      if (error) {
        return next(error);
      }
      res.render("game_detail", { game: results });
    });
};

// Update game form GET request

exports.updateGameGet = function (req, res, next) {
  async.parallel(
    {
      game: function (callback) {
        Game.findById(req.params.id).populate("platform").exec(callback);
      },
      platforms: function (callback) {
        Platform.find().exec(callback);
      },
    },
    function (error, results) {
      if (error) {
        return next(error);
      }
      res.render("game_form", {
        title: `${results.game.name} - ${results.game.platform.name}`,
        game: results.game,
        platforms: results.platforms,
      });
    }
  );
};

// Update game POST request

exports.updateGamePost = [
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
      function (error, game) {
        if (error) {
          return next(error);
        }
        res.redirect(game.url);
      }
    );
  },
];

// Delete game GET request

exports.deleteGameGet = function (req, res, next) {
  Game.findById(req.params.id)
    .populate("platform")
    .exec(function (error, game) {
      if (error) {
        return next(error);
      }
      res.render("game_delete", { game: game });
    });
};

// Delete game POST request

exports.deleteGamePost = function (req, res, next) {
  Game.findByIdAndRemove(req.params.id, function (error) {
    if (error) {
      return next(error);
    }
    res.redirect("/games");
  });
};
