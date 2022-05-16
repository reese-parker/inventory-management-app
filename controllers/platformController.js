const { response } = require("../app");
var Platform = require("../models/platform");

exports.platform_list = function (req, res, next) {
  Platform.find({}, "name").exec(function (err, list_platforms) {
    if (err) {
      return next(err);
    }
    res.render("platform_list", { platform_list: list_platforms });
  });
};
