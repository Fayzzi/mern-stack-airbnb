const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AccSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ownername: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    perks: {
      type: [String],
    },
    extraInfo: {
      type: String,
    },
    checkIn: {
      type: Number,
    },
    CheckOut: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    MaxGuest: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const accommodel = mongoose.model("MyAccommadations", AccSchema);
module.exports = accommodel;
