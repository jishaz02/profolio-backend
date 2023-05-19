const express = require("express");
const router = express.Router();

const UserSchema = require("../models/user.model"); // Import the Mongoose User model

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await UserSchema.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get a specific user
router.get("/:wAddress", async (req, res) => {
  const { wAddress } = req.params;
  try {
    const user = await UserSchema.findOne({ wAddress });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to create a new user
router.post("/", async (req, res) => {
  const { fName, lName, email, phone, wAddress, usn, role } = req.body;
  try {
    if (role === "student") {
      if (!usn) return res.status(404).json({ message: "USN is required" });
      const user = await UserSchema.create({
        fName,
        lName,
        email,
        phone,
        wAddress,
        usn,
        role,
      });
      res.status(201).json(user);
    } else if (role === "professor") {
      const user = await UserSchema.create({
        fname,
        lname,
        email,
        phone,
        wAddress,
        role,
      });
      res.status(201).json(user);
    } else {
      return res.status(404).json({ message: "Invalid role" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to update a user
router.put("/:wAddress", async (req, res) => {
  const { wAddress } = req.params;
  try {
    const user = await UserSchema.findOneAndUpdate({ wAddress }, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to delete a user
router.delete("/:wAddress", async (req, res) => {
  const { wAddress } = req.params;
  try {
    const user = await UserSchema.findOneAndDelete({ wAddress });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
