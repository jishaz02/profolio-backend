const mongoose = require("mongoose");

// Answer model
const AnswerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  wAddress: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Answer", AnswerSchema);
