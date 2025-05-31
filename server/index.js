const express = require("express");
const getQuestions = require("./getAllQuestions");
const readExpectations = require("./readInputs");

const app = express();

// Built-in body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Route to assess code
app.post("/assess", (req, res) => {
  const code = req.body.code;
  const problemID = req.body.probID;

  try {
    const result = readExpectations(problemID, code);
    if (result.status === "error") {
      res.status(500).json({ msg: result.data });
    } else {
      const response = `${result.data[0]} passed ${result.data[1]} failed`;
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Route to get all problems
app.get("/problems", (req, res) => {
  const questionList = getQuestions();
  res.status(200).send(questionList);
});

// Start server on port 3005
app.listen(3005, () => console.log("Server running on port 3005"));
app.listen(3004, () => console.log("Server running on port 3004"));