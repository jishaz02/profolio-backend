const express = require("express");
const router = express.Router();

const Portfolio = require("../models/portfolio.model");
const Project = require("../models/project.model");

// Create a new portfolio
router.post("/", async (req, res) => {
  const {
    domain,
    linkedin,
    wAddress,
    instagram,
    github,
    experience,
    certifications,
    projectsNo,
    bio,
    skills,
    project1Name,
    project1Github,
    project1Desc,
    project2Name,
    project2Github,
    project2Desc,
    project3Name,
    project3Github,
    project3Desc,
  } = req.body;

  try {
    const project1 = await Project.create({
      title: project1Name,
      githubLink: project1Github,
      description: project1Desc,
    });

    const project2 = await Project.create({
      title: project2Name,
      githubLink: project2Github,
      description: project2Desc,
    });

    const project3 = await Project.create({
      title: project3Name,
      githubLink: project3Github,
      description: project3Desc,
    });

    const portfolio = await Portfolio.create({
      domain: domain,
      linkedin: linkedin,
      wAddress: wAddress,
      instagram: instagram,
      github: github,
      experience: experience,
      certifications: certifications,
      projectsNo: projectsNo,
      bio: bio,
      skills: skills,
      projects: [project1.id, project2.id, project3.id],
    });
    res.status(201).json(portfolio);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

// Get a specific portfolio
router.get("/:wAddress", async (req, res) => {
  const { wAddress } = req.params;
  try {
    const portfolio = await Portfolio.find({ wAddress });
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a portfolio
router.patch("/:wAddress", async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
