const mongoose = require("mongoose");

// Project model
const ProjectSchema = new mongoose.Schema({
  githubLink:{ type: String, required: true },
  title: { type: String, required: true },
  // liveDemo: {type: String},
  description: {type: String},
});

module.exports = mongoose.model("Project", ProjectSchema);
