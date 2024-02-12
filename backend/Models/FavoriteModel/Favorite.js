const mongoose = require("mongoose");
const FavoriteSchema = new mongoose.Schema(
  {
    FavUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    FavPlace: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "MyAccommadations",
    },
  },
  {
    timestamps: true,
  }
);
const Favorite = mongoose.model("Favorites", FavoriteSchema);
module.exports = Favorite;
