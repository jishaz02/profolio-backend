const express = require("express");
const router = express.Router();

const UserSchema = require("../models/user.model");
const QuestionSchema = require("../models/question.model");
const AnswerSchema = require("../models/answer.model");

// Route to get all questions
router.get("/questions", async (req, res) => {
  const { topic } = req.query;
  try {
    const questions = await QuestionSchema.find({
      topic: topic,
    }); // Find all the questions with the specified topic
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get a specific question and its answers
router.get("/questions/:questionId", async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await QuestionSchema.findById(questionId); // Find the question with the specified ID
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to add a new question
router.post("/questions", async (req, res) => {
  const { title, content, wAddress, topic } = req.body;
  try {
    const user = await UserSchema.findOne({ wAddress: wAddress }); // Find the user who posted the question
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const question = await QuestionSchema.create({
      title,
      content,
      wAddress,
      topic,
    }); // Create a new question with the associated user
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to add an answer to a question
router.post("/questions/:questionId/answers", async (req, res) => {
  const { questionId } = req.params;
  const { content, wAddress } = req.body;
  try {
    const user = await UserSchema.findOne({ wAddress: wAddress }); // Find the user who posted the answer
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const answer = await AnswerSchema.create({ content, wAddress }); // Create a new answer with the associated user
    const question = await QuestionSchema.findByIdAndUpdate(
      questionId,
      { $push: { answers: answer._id } }, // Add the answer's ID to the 'answers' array of the question
      { new: true }
    );
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to upvote an answer
router.put("/answers/:answerId/upvote", async (req, res) => {
  const { answerId } = req.params;
  try {
    const answer = await AnswerSchema.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    answer.upvotes += 1; // Increment the upvotes count
    await answer.save();
    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to downvote an answer
router.put("/answers/:answerId/downvote", async (req, res) => {
  const { answerId } = req.params;
  try {
    const answer = await AnswerSchema.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    answer.downvotes += 1; // Increment the downvotes count
    await answer.save();
    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Route to get an answer
router.get("/answers/:answerId", async (req, res) => {
  const { answerId } = req.params;
  try {
    const answer = await AnswerSchema.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }
    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
