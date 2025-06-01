const express = require("express");
const getQuestions = require("./getAllQuestions");
const readExpectations = require("./readInputs");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

// Serve frontend build
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// API Routes
app.get("/problems", (req, res) => {
  const questionList = getQuestions();
  res.status(200).send(questionList);
});

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

// Start server on port 3005
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
