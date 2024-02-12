const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MyAccommadations",
      required: true,
    },
    bookerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    noOfGuests: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const BookingModel = mongoose.model("Bookings", bookingSchema);
module.exports = BookingModel;
