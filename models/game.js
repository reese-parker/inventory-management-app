var mongoose = require("mongoose");
var dayjs = require("dayjs")

var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: { type: String, required: true },
  platform: { type: Schema.Types.ObjectId, ref: "platform", required: true },
  description: { type: String, required: true },
  release_date: { type: Date, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});


GameSchema.virtual("url").get(function () {
  return "/games/" + this._id;
});

GameSchema.virtual("release_date_formatted").get(function () {
  return dayjs(this.release_date).format('YYYY-MM-DD')
})


module.exports = mongoose.model("game", GameSchema);
