# MERN Quiz Application - Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     BROWSER (Frontend)                          │
│                     http://localhost:3000                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  React Application (App.js)                              │  │
│  │                                                          │  │
│  │  ┌─ state variables ─────────────────────────────────┐  │  │
│  │  │ • questions: []                                  │  │  │
│  │  │ • currentQuestionIndex: 0                        │  │  │
│  │  │ • score: 0                                       │  │  │
│  │  │ • selectedAnswer: -1                             │  │  │
│  │  │ • isLoading: true                                │  │  │
│  │  │ • isQuizFinished: false                          │  │  │
│  │  │ • feedbackMessage: ""                            │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                        │                                  │  │
│  │  ┌─ handleAnswerSelect()  ← User clicks option          │  │
│  │  │ ← handleNextQuestion()     ← User clicks Next        │  │
│  │  │ ← submitScoreToBackend()   ← Quiz finished          │  │
│  │  │ ← handleRestartQuiz()      ← User clicks Restart    │  │
│  │  │                                                      │  │
│  │  ┌─ useEffect (mount) ──────────────────────────────┐  │  │
│  │  │ fetch GET /questions                             │  │  │
│  │  │ .then(data) → setQuestions(data)                 │  │  │
│  │  │ .finally() → setIsLoading(false)                 │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                                                          │  │
│  │  ┌─ Rendering Logic ──────────────────────────────────┐  │  │
│  │  │ if (isLoading) → show "Loading..."                │  │  │
│  │  │ if (isQuizFinished) → show Score Screen           │  │  │
│  │  │ else → show Quiz Screen                           │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────┬─────────────────────────────────────────────────────┬──┘
         │                                                    │
         │ HTTP Requests (fetch API)                         │
         │                                                    │
         ├──────────────────────────────────────────────────┤
         │                                                    │
         │  1. GET /questions (on mount)                    │
         │  2. POST /submit-score (quiz end)                │
         │                                                    │
         │                                                    │
┌────────▼─────────────────────────────────────────────────▼──┐
│                  Backend (Node.js)                           │
│            http://localhost:5000                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Express.js Server                                   │   │
│  │                                                     │   │
│  │ PORT: 5000                                          │   │
│  │ CORS: Enabled (allows requests from port 3000)     │   │
│  │ Middleware: express.json()                          │   │
│  │                                                     │   │
│  ├──────────────────────────────────────────────────┤   │
│  │ Data Storage: quizQuestions Array                  │   │
│  │                                                     │   │
│  │ [                                                   │   │
│  │   {                                                 │   │
│  │     id: 1,                                          │   │
│  │     question: "...",                                │   │
│  │     options: [...],                                 │   │
│  │     correctAnswer: 2  ← Only backend knows this!   │   │
│  │   },                                                │   │
│  │   ... 4 more questions                              │   │
│  │ ]                                                   │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Route 1: GET /questions                          │   │
│  │                                                  │   │
│  │ Receives: No parameters                          │   │
│  │ Action:   Map questions to remove correctAnswer  │   │
│  │ Sends:    Array of questions (WITHOUT answers)   │   │
│  │                                                  │   │
│  │ Example Response:                                │   │
│  │ [                                                │   │
│  │   {                                              │   │
│  │     id: 1,                                       │   │
│  │     question: "What is the capital of France?",  │   │
│  │     options: ["London", "Berlin", "Paris", ...]  │   │
│  │     // Note: NO correctAnswer field!             │   │
│  │   }                                              │   │
│  │ ]                                                │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Route 2: POST /submit-score                      │   │
│  │                                                  │   │
│  │ Receives: {                                      │   │
│  │   score: 4,    ← User's score                    │   │
│  │   total: 5     ← Total questions                 │   │
│  │ }                                                │   │
│  │                                                  │   │
│  │ Action:                                          │   │
│  │ 1. Calculate percentage: (4/5) * 100 = 80%       │   │
│  │ 2. Evaluate performance:                         │   │
│  │    • if >= 80%   → "Excellent work!"             │   │
│  │    • if >= 50%   → "Good job, keep practicing!"  │   │
│  │    • else        → "Needs improvement..."        │   │
│  │ 3. Return feedback message                       │   │
│  │                                                  │   │
│  │ Example Response:                                │   │
│  │ {                                                │   │
│  │   "message": "Excellent work!"                   │   │
│  │ }                                                │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow - Quiz Taking Process

```
START
  │
  ├─ User opens http://localhost:3000
  │  └─ React renders App component
  │     └─ useEffect hook triggers
  │        └─ fetch("http://localhost:5000/questions")
  │           │
  │           ▼
  │        [Network Request]
  │           │
  │           ▼
  │        Backend GET /questions
  │        └─ Returns 5 questions (no answers)
  │           │
  │           ▼
  │        Frontend receives JSON → setQuestions(data)
  │        └─ setIsLoading(false)
  │           │
  │           ▼
  │        Render Question 1
  │        └─ Show question text
  │           └─ Show 4 option buttons
  │              └─ Show Next button (DISABLED)
  │                 │
  │                 ▼ [User clicks option 1]
  │                 handleAnswerSelect(0)
  │                 └─ setSelectedAnswer(0)
  │                    └─ Option button turns BLUE
  │                       └─ Next button becomes ENABLED
  │                          │
  │                          ▼ [User clicks Next]
  │                          handleNextQuestion()
  │                          ├─ Get current question
  │                          ├─ Check: selectedAnswer === correctAnswer?
  │                          ├─ if YES → score++
  │                          ├─ if NO → score stays same
  │                          ├─ setSelectedAnswer(-1)
  │                          ├─ currentQuestionIndex++
  │                          └─ Loop back to "Render Question X"
  │                             (Repeat for questions 2, 3, 4, 5)
  │                                │
  │                                ▼ [Last question answered]
  │                                After Question 5 → no more questions
  │                                └─ submitScoreToBackend(finalScore)
  │                                   │
  │                                   ▼
  │                                [POST Request]
  │                                fetch("http://localhost:5000/submit-score")
  │                                POST: {score: 4, total: 5}
  │                                   │
  │                                   ▼
  │                                Backend POST /submit-score
  │                                ├─ Receive {score: 4, total: 5}
  │                                ├─ Calculate: 4/5 = 80%
  │                                ├─ Determine: >= 80% → "Excellent work!"
  │                                └─ Return: {message: "Excellent work!"}
  │                                   │
  │                                   ▼
  │                                Frontend receives feedback
  │                                └─ setFeedbackMessage("Excellent work!")
  │                                   └─ setIsQuizFinished(true)
  │                                      │
  │                                      ▼
  │                                Display Final Score Screen
  │                                ├─ "Your Score: 4 / 5"
  │                                ├─ "80%"
  │                                ├─ "Excellent work!"
  │                                └─ "Take Quiz Again" button
  │                                   │
  │                                   ▼ [User clicks restart]
  │                                   handleRestartQuiz()
  │                                   ├─ setCurrentQuestionIndex(0)
  │                                   ├─ setScore(0)
  │                                   ├─ setSelectedAnswer(-1)
  │                                   ├─ setIsQuizFinished(false)
  │                                   └─ Back to "Render Question 1"
  │
END
```

---

## 📊 Component State Lifecycle

```
┌─────────────────────────────────────┐
│ App Component Mounts                │
│ ├─ questions: []                    │
│ ├─ currentQuestionIndex: 0          │
│ ├─ score: 0                         │
│ ├─ selectedAnswer: -1               │
│ ├─ isLoading: true                  │
│ ├─ isQuizFinished: false            │
│ └─ feedbackMessage: ""              │
└────────────┬────────────────────────┘
             │
             ▼
     useEffect fetches data
             │
             ▼
┌─────────────────────────────────────┐
│ Loading State                       │
│ ├─ questions: [5 objects]           │
│ ├─ currentQuestionIndex: 0          │
│ ├─ score: 0                         │
│ ├─ selectedAnswer: -1               │
│ ├─ isLoading: true ◄── Still true   │
│ ├─ isQuizFinished: false            │
│ └─ feedbackMessage: ""              │
└────────────┬────────────────────────┘
             │
             ▼
     After fetch completes
             │
             ▼
┌─────────────────────────────────────┐
│ Quiz State (Question 1)             │
│ ├─ questions: [5 objects]           │
│ ├─ currentQuestionIndex: 0          │
│ ├─ score: 0                         │
│ ├─ selectedAnswer: -1               │
│ ├─ isLoading: false ◄── Now false   │
│ ├─ isQuizFinished: false            │
│ └─ feedbackMessage: ""              │
└────────────┬────────────────────────┘
             │
   User selects answer
             │
             ▼
┌─────────────────────────────────────┐
│ Options State                       │
│ ├─ questions: [5 objects]           │
│ ├─ currentQuestionIndex: 0          │
│ ├─ score: 0                         │
│ ├─ selectedAnswer: 0 ◄── Selected!  │
│ ├─ isLoading: false                 │
│ ├─ isQuizFinished: false            │
│ └─ feedbackMessage: ""              │
└────────────┬────────────────────────┘
             │
   User clicks Next
             │
             ▼
┌─────────────────────────────────────┐
│ After Answer (Q1 Correct)           │
│ ├─ questions: [5 objects]           │
│ ├─ currentQuestionIndex: 1          │
│ ├─ score: 1 ◄── Incremented!        │
│ ├─ selectedAnswer: -1 ◄── Reset     │
│ ├─ isLoading: false                 │
│ ├─ isQuizFinished: false            │
│ └─ feedbackMessage: ""              │
└────────────┬────────────────────────┘
             │
          ... (repeat for Q2-Q5)
             │
   All questions answered
             │
             ▼
┌─────────────────────────────────────┐
│ Final State                         │
│ ├─ questions: [5 objects]           │
│ ├─ currentQuestionIndex: 5          │
│ ├─ score: 4                         │
│ ├─ selectedAnswer: -1               │
│ ├─ isLoading: false                 │
│ ├─ isQuizFinished: true ◄── Done!   │
│ └─ feedbackMessage: "Excellent...   │
│                    work!"            │
└────────────┬────────────────────────┘
             │
   USER SEES FINAL SCORE SCREEN
```

---

## 🔐 Security Architecture

```
Question Data Flow (Learning Project):
──────────────────────────────────────

Frontend:                    Backend:
┌─────────────────┐         ┌─────────────────┐
│ YES Correct     │         │ YES Correct     │
│ Answers Here    │◄────────│ Answers Here    │
│ (for teaching)  │         │ (source of      │
│                 │         │  truth)         │
│ Question 1:     │         │ Question 1:     │
│ "Q: Capital?"   │         │ "Q: Capital?"   │
│ ["A", "B",      │         │ ["A", "B",      │
│  "C", "D"]      │         │  "C", "D"]      │
│ correct: 2      │         │ correct: 2      │
│                 │         │                 │
│ User selects: 2 │         │                 │
│ Frontend checks │         │                 │
│ 2 === 2? YES!   │         │                 │
│ Score++         │         │                 │
│                 │         │                 │
│ Final quiz:     │─────────►│ Receive score   │
│ Send score      │POST      │ Calculate %     │
│                 │          │ Return feedback │
│                 │◄─────────│ Answer verified │
└─────────────────┘         └─────────────────┘

Design for Learning:
─────────────────────

✅ Frontend has answers for immediate feedback
✅ Score calculation visible to user in real-time
✅ Backend still receives and validates score
✅ Great for understanding full flow
✅ Good teaching tool to show frontend-backend communication

Note: Production version would keep answers on backend only for security.
```

---

## 📡 Network Requests

```
Request 1: GET /questions
─────────────────────────

Client                              Server
  │                                   │
  ├─ fetch("http://localhost:5000/questions")
  │                                   │
  │                                   ├─ received GET /questions
  │                                   ├─ map questions array
  │                                   ├─ remove correctAnswer field
  │                                   ├─ send JSON response
  │                                   │
  ◄─ JSON [{ id, question, [options] }, ...5 more]
  │
  ├─ parse JSON
  ├─ setQuestions(data)
  ├─ setIsLoading(false)
  │
  └─ Render quiz UI


Request 2: POST /submit-score
─────────────────────────────────

Client                              Server
  │                                   │
  ├─ fetch("http://localhost:5000/submit-score",
  │   { method: "POST",
  │     body: JSON.stringify({
  │       score: 4,
  │       total: 5
  │     })
  │   })
  │                                   │
  │                                   ├─ received POST /submit-score
  │                                   ├─ extract score & total
  │                                   ├─ calc: 4/5 = 80%
  │                                   ├─ if 80% → "Excellent..."
  │                                   ├─ send JSON response
  │                                   │
  ◄─ JSON { message: "Excellent work!" }
  │
  ├─ parse JSON
  ├─ setFeedbackMessage(data.message)
  ├─ setIsQuizFinished(true)
  │
  └─ Render score screen
```

---

## 🎨 CSS Architecture

```
.app-container          Main container - centers quiz on page
  │
  └─ .quiz-card        White card - holds all content
       │
       ├─ .progress    "Question 1 of 5"
       │
       ├─ .question-text  "What is...?"
       │
       ├─ .options-container  Container for options
       │   │
       │   └─ .option-button × 4   Answer choice buttons
       │       ├─ normal state      gray background
       │       └─ .selected         blue background (user can change anytime)
       │
       └─ .next-button / .restart-button  Action buttons

States:
───────

Loading Screen:
┌─────────────────────┐
│  Loading quiz...    │
└─────────────────────┘

Quiz Screen:
┌─────────────────────────────────────┐
│ Question 1 of 5                     │
│                                     │
│ What is the capital of France?      │
│                                     │
│ ┌─ London           ┐               │
│ ├─ Berlin           ├─ 4 options   │
│ ├─ Paris  (selected)├─ Blue when   │
│ └─ Madrid           ┘    selected  │
│                                     │
│ [Next Button - Green - ENABLED]     │
└─────────────────────────────────────┘

Final Score Screen:
┌─────────────────────────────────────┐
│ Quiz Completed!                     │
│                                     │
│ Your Score: 4 / 5                   │
│                                     │
│ 80%                                 │
│                                     │
│ Excellent work!  (from backend)     │
│                                     │
│ [Take Quiz Again - Blue]            │
└─────────────────────────────────────┘
```

---

## 📦 Dependencies

```
Backend:
────────
├─ Express.js v5.2.1
│  └─ Web framework for Node.js
│
└─ CORS v2.8.6
   └─ Enable cross-origin requests

Frontend:
─────────
├─ React v18.x
│  └─ UI framework (built into create-react-app)
│
└─ React-DOM v18.x
   └─ React rendering engine

No External UI:
───────────────
✅ Plain CSS only
✅ No Tailwind
✅ No Bootstrap
✅ No Material-UI
✅ No styled-components
```

---

**This simple architecture makes the project perfect for education and college presentations!**
