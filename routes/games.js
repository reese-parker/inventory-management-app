var express = require("express");
const res = require("express/lib/response");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("all games");
});

module.exports = router;
