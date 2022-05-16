var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PlatformSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

PlatformSchema.virtual("url").get(function () {
  return "/platform/" + this._id;
});

module.exports = mongoose.model("platform", PlatformSchema);
