const express = require("express");
const mongoose = require("mongoose");
const forumRoute = require("./routes/forum.route");
const userRoute = require("./routes/user.route");
const teamRoute = require("./routes/team.route");
const cors = require("cors");
const portfolioModel = require("./models/portfolio.model");
const portfolioRoute = require("./routes/portfolio.route");

const port = 5000;

const app = express();

app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://jishacheriyan02:4ClkQQDN6TY1tGnS@cluster0.be15y9d.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(express.json());

// Routes
app.use("/forum", forumRoute);
app.use("/users", userRoute);
app.use("/portfolio", portfolioRoute);
app.use("/teams", teamRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`)); //start in this port 5000
