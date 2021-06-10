const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  category: {
    type: String,
    enum: ["birthday", "holiday", "congrats", "anniversary"],
  },

  type: {
    type: String,
    enum: ["starter", "user"],
    default: "starter",
  },

  image: {
    type: String,
    required: true,
  },

  content: {
    type: String,
  },

  recipientName: {
    type: String,
  },

  sent: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Card", CardSchema);
