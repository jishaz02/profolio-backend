const mongoose = require("mongoose");

// User model
const UserSchema = new mongoose.Schema({
  wAddress: { type: String, required: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  usn: { type: String },
  role: {
    type: String,
    required: true,
    enum: ["student", "professor"],
    default: "student",
  },
});

module.exports = mongoose.model("User", UserSchema);
