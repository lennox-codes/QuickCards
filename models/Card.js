const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["birthday", "christmas"],
  },

  heading: {
    type: String,
  },

  image: {
    type: String,
  },
});

module.exports = mongoose.model("Card", "CardSchema");
