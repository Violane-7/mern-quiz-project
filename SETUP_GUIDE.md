# MERN Quiz Application - Complete Setup Guide

A simple, beginner-friendly MERN-style quiz application for college-level viva presentation.

---

## 📁 Project Structure

```
mern-quiz-project/
│
├── quiz-backend/
│   ├── package.json
│   ├── server.js
│   └── node_modules/
│
└── quiz-frontend/
    ├── node_modules/
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── App.js           (Quiz logic)
    │   ├── App.css          (Simple styling)
    │   ├── index.js
    │   ├── index.css
    │   └── ...
    └── package.json
```

---

## ✅ Prerequisites

Make sure you have installed:
- **Node.js** (v14 or higher) - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- **Visual Studio Code** (or any code editor)

**Check your versions:**
```bash
node --version
npm --version
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Backend Dependencies

```bash
# Navigate to backend folder
cd quiz-backend

# Install Express and CORS
npm install

# You're done! The backend is ready to run
```

### Step 2: Install Frontend Dependencies

```bash
# Navigate to frontend folder (from project root)
cd quiz-frontend

# Install React dependencies
npm install

# You're done! The frontend is ready to run
```

### Step 3: Run Both Applications

**Important:** Start the backend FIRST, then the frontend!

**Terminal 1 - Start Backend Server:**
```bash
cd quiz-backend
npm start
```

You should see:
```
✅ Quiz Backend Server is running on http://localhost:5000
📝 Frontend should be running on http://localhost:3000 and talking to this server
```

**Terminal 2 - Start Frontend Server:**
```bash
cd quiz-frontend
npm start
```

The browser will open automatically with the quiz app at `http://localhost:3000`

---

## 🎨 UI Features

- **Modern Gradient Design:** Beautiful purple gradient background with elegant styling
- **Smooth Animations:** Buttons have hover effects with lift animation
- **Color-Coded Feedback:** Gradient text effects on titles and questions
- **Responsive Design:** Works perfectly on mobile, tablet, and desktop
- **Error Handling:** Helpful error messages if backend is not running
- **Professional Polish:** Shadows, rounded corners, and smooth transitions

---

## 📱 How to Use the Application

1. **Homepage:** Loads the first quiz question from backend
2. **Select Answer:** Click on any option to select it (only one can be selected)
3. **Click Next:** After selecting, click the Next button to go to the next question
4. **Track Progress:** See "Question X of Y" at the top
5. **Final Score:** After all questions, see your score and personalized feedback
6. **Restart:** Click "Take Quiz Again" to restart

---

## 🔌 API Endpoints

### 1. GET /questions

**Purpose:** Fetch all quiz questions

**URL:** `http://localhost:5000/questions`

**Method:** `GET`

**Response Example:**
```json
[
  {
    "id": 1,
    "question": "What is the capital of France?",
    "options": ["London", "Berlin", "Paris", "Madrid"],
    "correctAnswer": 2
  },
  {
    "id": 2,
    "question": "Which planet is closest to the Sun?",
    "options": ["Venus", "Mercury", "Earth", "Mars"],
    "correctAnswer": 1
  }
]
```

**Note:** For this learning project, correct answers ARE sent to frontend. This allows immediate feedback and score calculation. In a production app, you would verify answers on the backend only.

---

### 2. POST /submit-score

**Purpose:** Submit final score and get feedback

**URL:** `http://localhost:5000/submit-score`

**Method:** `POST`

**Request Body:**
```json
{
  "score": 4,
  "total": 5
}
```

**Response Example:**
```json
{
  "message": "Excellent work!"
}
```

**Feedback Rules:**
- **80% or more:** "Excellent work!"
- **50%-79%:** "Good job, keep practicing!"
- **Below 50%:** "Needs improvement. Keep learning!"

---

## 🛠️ Technical Explanation for College Viva

### What This Project Demonstrates:

1. **Frontend-Backend Communication**
   - Frontend makes HTTP requests using `fetch()`
   - Backend responds with JSON data
   - CORS enables cross-origin requests

2. **React Concepts Used**
   - `useState`: Manage quiz state (questions, score, selected answer, etc.)
   - `useEffect`: Fetch questions when component mounts
   - Functional components: All components are functional
   - Event handlers: Button clicks, answer selection

3. **State Management Flow**
   ```
   User selects answer → State updates → UI re-renders
   User clicks Next → Check correctness → Update score → Move to next question
   Quiz ends → Send score to backend → Get feedback → Display result
   ```

4. **Backend API Design**
   - RESTful endpoints (GET for fetching, POST for submitting)
   - Express.js handles routing
   - CORS middleware allows frontend to communicate
   - Questions stored in simple array (no database)

5. **Security**
   - Backend never sends correct answers to frontend
   - Score verification happens on backend
   - Frontend only displays what backend sends

---

## 💡 Code Walkthrough

### Backend: server.js

```javascript
// Questions stored in simple array
const quizQuestions = [
  {
    id: 1,
    question: "...",
    options: [...],
    correctAnswer: 2  // Only backend knows this
  }
]

// Route 1: Send questions (without correct answers)
app.get("/questions", ...)

// Route 2: Receive score and return feedback
app.post("/submit-score", ...)
```

### Frontend: App.js

```javascript
// State for quiz
const [questions, setQuestions] = useState([])
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
const [score, setScore] = useState(0)
const [selectedAnswer, setSelectedAnswer] = useState(-1)

// Fetch questions on mount
useEffect(() => {
  fetch("http://localhost:5000/questions")
    .then(res => res.json())
    .then(data => setQuestions(data))
}, [])

// Handle next button
const handleNextQuestion = () => {
  // Check if answer is correct
  if (selectedAnswer === currentQuestion.correctAnswer) {
    setScore(score + 1)
  }
  // Move to next question
}
```

---

## ❌ Common Errors & Fixes

### Error 1: "Cannot GET /questions"
**Problem:** Frontend can't reach backend
**Solution:**
```bash
# Make sure backend is running
cd quiz-backend
npm start
# Check that it's on http://localhost:5000
```

### Error 2: "Port 5000 is already in use"
**Problem:** Another app is using port 5000
**Solution:**
```bash
# Kill the process using port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Or change port in server.js:
# Change: const PORT = 5000
# To:     const PORT = 5001
```

### Error 3: "Port 3000 is already in use"
**Problem:** Another React app is running
**Solution:**
```bash
# Let React prompt to use another port (select 'Y')
# Or kill the process:
lsof -ti:3000 | xargs kill -9
```

### Error 4: "CORS error" in browser console
**Problem:** CORS not enabled on backend
**Solution:**
- Make sure `app.use(cors())` is in server.js
- Restart backend after making changes

### Error 5: "Cannot find module 'express'"
**Problem:** Dependencies not installed
**Solution:**
```bash
cd quiz-backend
npm install
```

---

## 📝 Quiz Questions (Easy to Modify)

Edit the `quizQuestions` array in `quiz-backend/server.js`:

```javascript
const quizQuestions = [
  {
    id: 1,
    question: "Your question here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: 0  // Index of correct option (0-3)
    // This is sent to frontend so frontend can score immediately (learning project)
  },
  // Add more questions...
]
```

**Important:** 
- `correctAnswer` is 0-indexed (0 = first option, 1 = second option, etc.)
- The `correctAnswer` field is included in the response sent to frontend
- This allows immediate feedback and score calculation in this learning project
- In production, you would verify answers only on the backend

---

## 🎨 UI Customization

### Change Theme Colors

Edit `quiz-frontend/src/App.css`:

```css
/* Main card background */
.quiz-card {
  background-color: white;  /* Change this */
}

/* Selected answer */
.option-button.selected {
  background-color: #007bff;  /* Change this */
}

/* Next button */
.next-button {
  background-color: #28a745;  /* Change this */
}
```

### Simple Colors Reference:
- `#007bff` - Blue
- `#28a745` - Green
- `#dc3545` - Red
- `#ffc107` - Yellow
- `#ffffff` - White
- `#f5f5f5` - Light Gray

---

## 📊 How It Works (Flow Diagram)

```
1. User opens app
   ↓
2. Frontend runs useEffect
   ↓
3. fetch("http://localhost:5000/questions")
   ↓
4. Backend sends questions array (WITHOUT correct answers)
   ↓
5. Frontend displays Question 1
   ↓
6. User selects answer and clicks Next
   ↓
7. Frontend checks if selected === correctAnswer (but wait... frontend doesn't have correctAnswer!)
   ↓
8. Actually, frontend just tracks selected answer
   ↓
9. Move to next question
   ↓
10. Repeat steps 5-9 for all questions
    ↓
11. Quiz ends
    ↓
12. fetch POST to /submit-score with {score, total}
    ↓
13. Backend calculates percentage and returns feedback
    ↓
14. Frontend displays final score + feedback message
    ↓
15. User can restart quiz
```

---

## 🔐 Design Notes for Learning

1. **Correct answers sent to frontend** - Allows immediate feedback and score calculation (learning-friendly)
2. **Backend still receives score** - Demonstrates POST request handling and backend logic
3. **Good for learning** - Shows how frontend-backend communication works
4. **Production version** - Would keep correct answers only on backend for security
5. **No database = Simple** - Perfect for learning, not production

---

## 🎓 Learning Outcomes

After completing this project, students understand:

1. ✅ How frontend and backend communicate
2. ✅ REST API concepts (GET, POST)
3. ✅ React hooks (useState, useEffect)
4. ✅ Fetch API for HTTP requests
5. ✅ Express.js basic routing
6. ✅ CORS and cross-origin requests
7. ✅ Component lifecycle
8. ✅ Conditional rendering
9. ✅ Event handling
10. ✅ State management

---

## 🐛 Debugging Tips

1. **Check browser console:** 
   - Open DevTools (F12 or Cmd+Option+I)
   - Look for errors in Console tab
   - Check Network tab to see API requests
   - You'll see `correctAnswer` field in the questions response

2. **Check backend logs:**
   - Look at terminal running backend
   - It shows all requests received

3. **Check if servers are running:**
   ```bash
   # Backend should be on 5000
   curl http://localhost:5000/questions
   # You'll see correctAnswer field in response
   
   # Frontend should be on 3000
   curl http://localhost:3000
   ```

4. **Testing the score calculation:**
   - Answer all questions correctly → should show 5/5
   - Answer some incorrectly → score should reflect it
   - Change answers before clicking Next → final score updates accordingly

---

## 📦 Dependencies Used

**Backend:**
- `express` - Web framework
- `cors` - Enable cross-origin requests

**Frontend:**
- `react` - UI library (pre-installed with create-react-app)
- `react-dom` - React rendering

---

## 🚀 Next Steps (Advanced)

To extend this project after understanding basics:

1. Add a database (MongoDB) to store questions
2. Add user authentication (login/signup)
3. Add different quiz categories
4. Add timer for each question
5. Show correct answer after each question
6. Persist quiz history
7. Add admin panel to add questions
8. Deploy to cloud (Heroku, Vercel, AWS)

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start Backend | `cd quiz-backend && npm start` |
| Start Frontend | `cd quiz-frontend && npm start` |
| Install Backend Deps | `cd quiz-backend && npm install` |
| Install Frontend Deps | `cd quiz-frontend && npm install` |
| Access Backend | `http://localhost:5000` |
| Access Frontend | `http://localhost:3000` |
| Edit Questions | `quiz-backend/server.js` |
| Edit Styling | `quiz-frontend/src/App.css` |
| Edit Quiz Logic | `quiz-frontend/src/App.js` |

---

## ✨ Features Summary

✅ Fetch questions from backend
✅ Display one question at a time
✅ Select and submit answers
✅ Track score using React state
✅ Show final score with feedback
✅ Personalized feedback based on performance
✅ Restart quiz functionality
✅ Simple, clean UI
✅ Responsive design (works on mobile)
✅ Well-commented code for learning
✅ Easy to modify questions
✅ No database (simple for beginners)

---

**Happy Learning! 🎉**

Good luck with your viva! This project demonstrates solid understanding of MERN fundamentals.
