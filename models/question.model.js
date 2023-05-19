const mongoose = require("mongoose");

// Question model
const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  wAddress: { type: String, required: true },
  topic: { type: String, required: true },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
});

module.exports = mongoose.model("Question", QuestionSchema);
