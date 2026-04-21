# ⚡ ACIE — AI Career Intelligence Engine

A premium, production-ready AI-powered career learning platform built with React, Vite, Tailwind CSS, Framer Motion, Redux Toolkit, and Recharts.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## 🏗️ Project Structure

```
src/
├── assets/
│   └── data/
│       └── mockData.js          # All mock data (courses, problems, charts)
├── components/
│   ├── ui/                      # Reusable UI primitives
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── CircularProgress.jsx
│   │   ├── FloatingChatbot.jsx
│   │   ├── GlassCard.jsx
│   │   ├── PageTransition.jsx
│   │   ├── PomodoroWidget.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── TopBar.jsx
│   ├── dashboard/               # Dashboard section components
│   │   ├── CareerReadinessCard.jsx
│   │   ├── StreakCard.jsx
│   │   ├── StudyPlanCard.jsx
│   │   ├── TopicHeatmap.jsx
│   │   └── WeeklySummaryCard.jsx
│   └── gamification/
│       └── GamificationBadges.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── usePomodoro.js
│   ├── useTheme.js
│   └── useUser.js
├── pages/
│   ├── AuthPages.jsx            # Login, Signup, OTP, ForgotPassword
│   ├── DashboardLayout.jsx      # Main shell with sidebar
│   ├── DashboardPage.jsx
│   ├── CodingPage.jsx           # Monaco editor + problem list
│   ├── CoursesPage.jsx
│   ├── AnalyticsPage.jsx        # Recharts dashboards
│   ├── InterviewPage.jsx        # AI mock interview
│   ├── LeaderboardPage.jsx
│   ├── LandingPage.jsx
│   └── ProfilePage.jsx
├── store/
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       ├── themeSlice.js
│       ├── userSlice.js
│       └── uiSlice.js
├── utils/
│   ├── constants.js
│   └── helpers.js
├── App.jsx
├── main.jsx
└── index.css
```

## ✨ Features

### 🏠 Landing Page
- Animated background orbs
- Stats counter animation
- Feature showcase
- Testimonials
- 3-tier pricing (Free / Pro / Elite)
- CTA section

### 🔐 Auth Pages
- Login with floating labels
- Signup with validation
- OTP verification (6 digit boxes)
- Forgot password flow
- Split-screen layout

### 📊 Dashboard
- Career Readiness circular progress
- Resume Strength score
- 7-Day Streak tracker with confetti
- Topic Mastery Heatmap
- Today's Study Plan (interactive checklist)
- Weekly Summary cards
- Gamification badges & XP levels
- Motivational quote

### 💻 Coding Platform
- Monaco Editor integration
- 6 sample problems (Easy/Medium/Hard)
- Language switcher (JS/Python/Java/C++)
- Run & Submit buttons with animations
- Output console
- Problem bookmarking
- XP reward system

### 🎓 Courses
- 6 course categories
- Progress tracking
- Continue Learning section
- Filter by category + search
- Enrollment flow

### 📈 Analytics
- Line chart (progress over time)
- Bar chart (topic accuracy)
- Radar chart (skill coverage)
- Pie chart (mistake distribution)
- Monthly Mock Test card
- Locked Elite feature UI

### 🎤 Interview AI
- Chat-style mock interview
- AI typing animation
- Performance breakdown bars
- Feedback & improvement tips tabs

### 🏆 Leaderboard
- Podium-style top 3
- "You" highlighted entry
- Full rankings table with XP bars

### 👤 Profile
- Avatar with gradient
- Level/XP progress bar
- Career Readiness breakdown
- Achievement badges
- Learning goals

### 🎮 Extras
- 🌙 Dark/Light theme toggle (persisted)
- ⏱ Draggable Pomodoro timer widget
- 🤖 Floating AI chatbot
- 🔔 Notification center
- Collapsible sidebar
- Page transition animations

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| Redux Toolkit | State management |
| React Router v6 | Client-side routing |
| Recharts | Data visualization |
| Monaco Editor | Code editor |
| React Hot Toast | Notifications |
| React Confetti | Celebration effects |

## 🎨 Design Principles

- **Glassmorphism**: Frosted glass cards with backdrop blur
- **Dark-first**: Optimized for dark mode with light mode support
- **Micro-interactions**: Hover elevations, scale animations
- **Futuristic**: Gradient accents, glowing effects
- **Responsive**: Mobile-first with collapsible navigation

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🔧 Customization

### Add new problems
Edit `src/assets/data/mockData.js` — add to the `problems` array.

### Add new courses
Edit `src/assets/data/mockData.js` — add to the `courses` array.

### Change theme colors
Edit `tailwind.config.js` and `src/hooks/useTheme.js`.

---

Built with ❤️ by ACIE Team · 2026
