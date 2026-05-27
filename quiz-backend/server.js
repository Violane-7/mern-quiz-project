// Import required modules
const express = require("express");
const cors = require("cors");

// Create Express app
const app = express();

// Define the port where backend will run
const PORT = 5000;

// Enable CORS for frontend communication
app.use(cors());

// Enable JSON body parsing for POST requests
app.use(express.json());

// ====================================
// QUIZ QUESTIONS DATA (Simple Array)
// ====================================
// This array stores all quiz questions
// Each question has: id, question text, 4 options, correct answer index
const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2, // Index of correct option (0-indexed)
  },
  {
    id: 2,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
  },
  {
    id: 4,
    question: "Who wrote Romeo and Juliet?",
    options: [
      "Jane Austen",
      "William Shakespeare",
      "Charles Dickens",
      "Mark Twain",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
  },
];

// ====================================
// ROUTE 1: GET /questions
// ====================================
// This route sends all quiz questions to the frontend
// For a learning project, we send correct answers too
// In production, you would verify answers on backend
app.get("/questions", (req, res) => {
  // Send all questions including correct answers
  // This allows frontend to check answers and display immediate feedback
  res.json(quizQuestions);
});

// ====================================
// ROUTE 2: POST /submit-score
// ====================================
// This route receives the final score from frontend
// It evaluates performance and returns personalized feedback
app.post("/submit-score", (req, res) => {
  // Extract score and total from request body
  const { score, total } = req.body;

  // Calculate percentage
  const percentage = (score / total) * 100;

  // Determine feedback based on performance
  let feedback = "";

  if (percentage >= 80) {
    // Excellent performance
    feedback = "Excellent work!";
  } else if (percentage >= 50) {
    // Good performance
    feedback = "Good job, keep practicing!";
  } else {
    // Needs improvement
    feedback = "Needs improvement. Keep learning!";
  }

  // Send response with feedback message
  res.json({
    message: feedback,
  });
});

// ====================================
// START SERVER
// ====================================
// Listen on the specified PORT and log a message when server starts
app.listen(PORT, () => {
  console.log(`✅ Quiz Backend Server is running on http://localhost:${PORT}`);
  console.log(
    `📝 Frontend should be running on http://localhost:3000 and talking to this server`
  );
});
