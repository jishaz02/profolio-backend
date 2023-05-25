const mongoose = require("mongoose");

// Team model
const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  size: { type: Number, required: true },
  members: [{ type: String }],
  leader: { type: String, required: true },
  topic: { type: String, required: true },
});

module.exports = mongoose.model("Team", TeamSchema);
