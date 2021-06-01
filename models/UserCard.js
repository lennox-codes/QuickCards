const mongoose = require("mongoose");

const UserCardSchema = new mongoose.schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
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
