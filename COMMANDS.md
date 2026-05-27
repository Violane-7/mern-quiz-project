# Quick Terminal Commands Reference

## 🚀 Starting Everything (Recommended)

**Terminal 1 - Backend:**
```bash
cd quiz-backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd quiz-frontend
npm start
```

Browser opens automatically on `http://localhost:3000`

---

## 📦 First Time Setup

**Backend setup:**
```bash
cd quiz-backend
npm install
npm start
```

**Frontend setup (if not already created with create-react-app):**
```bash
cd quiz-frontend
npm install
npm start
```

---

## 🔍 Checking if Servers are Running

**Check Backend:**
```bash
curl http://localhost:5000/questions
```

Should return JSON array of questions.

**Check Frontend:**
```bash
curl http://localhost:3000
```

Should return HTML.

---

## 🛠️ Common Debugging Commands

**Kill process on port 5000 (Backend):**
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Kill process on port 3000 (Frontend):**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Clear npm cache:**
```bash
npm cache clean --force
```

---

## 📂 Navigation

**Go to backend folder:**
```bash
cd quiz-backend
```

**Go to frontend folder:**
```bash
cd quiz-frontend
```

**Go to project root:**
```bash
cd ..
```

**Show current directory:**
```bash
pwd
```

**List files:**
```bash
ls        # macOS/Linux
dir       # Windows
```

---

## 📝 Editing Questions

**Open server.js in editor:**
```bash
# Option 1: Using VS Code
code quiz-backend/server.js

# Option 2: Using nano
nano quiz-backend/server.js

# Option 3: Using vim
vim quiz-backend/server.js
```

After editing, **restart backend:**
```bash
npm start
```

---

## 🧹 Clean Up

**Remove node_modules from backend:**
```bash
cd quiz-backend
rm -rf node_modules  # macOS/Linux
rmdir /s node_modules  # Windows
```

**Remove node_modules from frontend:**
```bash
cd quiz-frontend
rm -rf node_modules  # macOS/Linux
rmdir /s node_modules  # Windows
```

**Reinstall fresh:**
```bash
npm install
```

---

## 🌐 Useful URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Get Questions API:** http://localhost:5000/questions
- **Submit Score API:** http://localhost:5000/submit-score (POST only)

---

## 📊 File Locations

**Backend files:**
- Questions data: `quiz-backend/server.js` (Line ~30-65)
- Routes: `quiz-backend/server.js` (Line ~75+)

**Frontend files:**
- Main logic: `quiz-frontend/src/App.js`
- Styling: `quiz-frontend/src/App.css`

---

## 🐛 Troubleshooting Commands

**Check Node version:**
```bash
node --version
```

**Check npm version:**
```bash
npm --version
```

**See what's running on port 5000:**
```bash
# macOS/Linux
lsof -i :5000

# Windows
netstat -ano | findstr :5000
```

**See what's running on port 3000:**
```bash
# macOS/Linux
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

---

## 🚨 If Something Goes Wrong

**Step 1: Kill both servers**
```bash
# Ctrl+C in both terminals
```

**Step 2: Clear cache**
```bash
npm cache clean --force
```

**Step 3: Reinstall dependencies**
```bash
# In quiz-backend
rm -rf node_modules
npm install

# In quiz-frontend
rm -rf node_modules
npm install
```

**Step 4: Start fresh**
```bash
# Terminal 1
cd quiz-backend && npm start

# Terminal 2
cd quiz-frontend && npm start
```

---

## 📋 Complete Setup Checklist

- [ ] Node.js installed
- [ ] npm -v works
- [ ] cd quiz-backend && npm install ✅
- [ ] npm start (Backend) ✅
- [ ] http://localhost:5000/questions returns JSON ✅
- [ ] cd quiz-frontend && npm install ✅
- [ ] npm start (Frontend) ✅
- [ ] http://localhost:3000 loads quiz ✅
- [ ] Can select answers ✅
- [ ] Can click Next ✅
- [ ] Score updates correctly ✅
- [ ] Final screen shows feedback ✅

---

## 💡 Pro Tips

**Use multiple terminal tabs:**
- Instead of separate windows, use tabs (Cmd+T on macOS, Ctrl+Shift+T on most terminals)
- Easier to manage

**Keep browser DevTools open:**
- Press F12 or Cmd+Option+I
- Check Console for errors
- Check Network tab to see API calls

**Use VS Code integrated terminal:**
- Press Ctrl+` (backtick) to open terminal in VS Code
- Super convenient!

---

**Everything ready? Start running the app! 🎉**
