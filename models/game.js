var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: { type: String, required: true },
  platform: { type: Schema.Types.ObjectId, ref: "Platform", required: true },
  description: { type: String, required: true },
  release_date: { type: Date, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});


GameSchema.virtual("url").get(function () {
  return "/game/" + this._id;
});


module.exports = mongoose.model("Game", GameSchema);
