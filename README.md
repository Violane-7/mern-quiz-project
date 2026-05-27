# 📝 MERN Quiz Application

A beginner-friendly MERN quiz application built with React, Node.js, and Express.js.

## 🎯 Quick Start

```bash
# Terminal 1: Start Backend
cd quiz-backend
npm install
npm start

# Terminal 2: Start Frontend
cd quiz-frontend
npm install
npm start
```

Then open http://localhost:3000 in your browser.

## 📚 Features

- ✅ Fetch quiz questions from backend API
- ✅ Select answers and track score with React state
- ✅ Get personalized feedback based on performance
- ✅ Restart quiz functionality
- ✅ Simple, clean UI
- ✅ No database (questions in array)
- ✅ Well-commented code

## 🔌 API Endpoints

- `GET /questions` - Get all quiz questions
- `POST /submit-score` - Submit score and get feedback

## 📖 Documentation

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for:
- Complete setup instructions
- API documentation
- Code explanations
- Common errors and fixes
- How to customize questions

## 📁 Structure

```
mern-quiz-project/
├── quiz-backend/
│   ├── package.json
│   └── server.js
└── quiz-frontend/
    ├── public/
    ├── src/
    │   ├── App.js
    │   └── App.css
    └── package.json
```

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, CORS
**Frontend:** React, JavaScript (ES6+)

---

For college viva presentation, refer to SETUP_GUIDE.md for detailed explanations!
