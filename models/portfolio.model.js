const mongoose = require("mongoose");

// Portfolio model
const PortfolioSchema = new mongoose.Schema({
  domain: { type: String, required: true },
  linkedin: { type: String, required: true },
  wAddress: { type: String, required: true },
  instagram: { type: String, required: true },
  github: { type: String, required: true },
  experience: { type: String, required: true },
  certifications: { type: String, required: true },
  projectsNo: { type: String, required: true },
  bio: { type: String, required: true },
  skills: [{ type: String, required: true }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
