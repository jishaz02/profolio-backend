const express = require("express");
const router = express.Router();

const TeamSchema = require("../models/team.model");

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await TeamSchema.find({}); // Find all the teams
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//get a specific team
router.get("/:teamId", async (req, res) => {
  const { teamId } = req.params;
  try {
    const team = await TeamSchema.findById(teamId); // Find the team with the specified ID
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to add a new team
router.post("/", async (req, res) => {
  const { name, description, size, leader, topic } = req.body;
  const members = [];
  members.push(leader);
  try {
    const team = await TeamSchema.create({
      name,
      description,
      size,
      leader,
      topic,
      members,
    }); // Create a new team with the associated user
    res.status(201).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//add a member to a team
router.post("/:teamId/members", async (req, res) => {
  const { teamId } = req.params;
  const { member } = req.body;
  try {
    const team = await TeamSchema.findById(teamId); // Find the team with the specified ID
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    team.members.push(member);
    await team.save();
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
