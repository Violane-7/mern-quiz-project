import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // ====================================
  // STATE VARIABLES
  // ====================================

  // Store all quiz questions fetched from backend
  const [questions, setQuestions] = useState([]);

  // Track which question we're currently showing (0-indexed)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Track the user's score
  const [score, setScore] = useState(0);

  // Track which answer option is selected by user (-1 means none selected)
  const [selectedAnswer, setSelectedAnswer] = useState(-1);

  // Track if questions are still being fetched
  const [isLoading, setIsLoading] = useState(true);

  // Track if quiz is finished (to show final score screen)
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Store feedback message from backend
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // ====================================
  // FETCH QUIZ QUESTIONS (useEffect)
  // ====================================
  // This effect runs ONCE when component mounts
  // It fetches all quiz questions from backend API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Call backend GET /questions endpoint
        const response = await fetch("http://localhost:5000/questions");

        // Convert response to JSON
        const data = await response.json();

        // Store questions in state
        setQuestions(data);

        // Stop showing loading message
        setIsLoading(false);
      } catch (error) {
        // If error occurs, log it
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      }
    };

    // Call the fetch function
    fetchQuestions();
  }, []); // Empty dependency array means this runs only on mount

  // ====================================
  // HANDLER FUNCTIONS
  // ====================================

  // Handle when user selects an answer option
  const handleAnswerSelect = (optionIndex) => {
    // Allow user to change their selection at any time before clicking Next
    setSelectedAnswer(optionIndex);
  };

  // Handle when user clicks Next button
  const handleNextQuestion = () => {
    // Get current question to check if selected answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // If answer is correct, increase score
    if (isCorrect) {
      setScore(score + 1);
    }

    // Reset selected answer for next question
    setSelectedAnswer(-1);

    // Check if there are more questions
    if (currentQuestionIndex + 1 < questions.length) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz is finished, show final score
      submitScoreToBackend(score + (isCorrect ? 1 : 0));
    }
  };

  // Send final score to backend for feedback
  const submitScoreToBackend = async (finalScore) => {
    try {
      // Call backend POST /submit-score endpoint
      const response = await fetch("http://localhost:5000/submit-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: finalScore,
          total: questions.length,
        }),
      });

      // Get feedback message from backend
      const data = await response.json();

      // Store feedback and mark quiz as finished
      setFeedbackMessage(data.message);
      setIsQuizFinished(true);
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  // Handle when user wants to restart quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(-1);
    setIsQuizFinished(false);
    setFeedbackMessage("");
  };

  // ====================================
  // LOADING STATE
  // ====================================
  if (isLoading) {
    return (
      <div className="app-container">
        <div className="quiz-card">
          <p className="loading">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  // ====================================
  // FINAL SCORE SCREEN
  // ====================================
  if (isQuizFinished) {
    return (
      <div className="app-container">
        <div className="quiz-card">
          {/* Show final score */}
          <h1 className="final-title">Quiz Completed!</h1>

          <p className="final-score">
            Your Score: <strong>{score}</strong> / {questions.length}
          </p>

          {/* Show percentage */}
          <p className="percentage">
            {Math.round((score / questions.length) * 100)}%
          </p>

          {/* Show feedback from backend */}
          <p className="feedback">{feedbackMessage}</p>

          {/* Restart button */}
          <button className="restart-button" onClick={handleRestartQuiz}>
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  // ====================================
  // QUIZ QUESTION SCREEN (Main UI)
  // ====================================
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="app-container">
      <div className="quiz-card">
        {/* Progress indicator */}
        <div className="progress">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>

        {/* Question text */}
        <h2 className="question-text">{currentQuestion.question}</h2>

        {/* Options (buttons) */}
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            // Each option is a button
            <button
              key={index}
              className={`option-button ${
                // Add 'selected' class if this option is selected
                selectedAnswer === index ? "selected" : ""
              }`}
              onClick={() => handleAnswerSelect(index)}
              // Allow user to change answer until Next is clicked
            >
              {option}
            </button>
          ))}
        </div>

        {/* Next button - only enabled if answer is selected */}
        <button
          className="next-button"
          onClick={handleNextQuestion}
          // Only allow clicking if an answer is selected
          disabled={selectedAnswer === -1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
