# 📡 QuizNet – Smart WiFi Access Portal

A production-ready frontend for a quiz-based WiFi captive portal system built with React + Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Auth UI** – Login, Register with JWT stored in localStorage
- **Protected Routes** – Role-based routing (user / admin)
- **Quiz Flow** – Per-question countdown timer, progress bar, auto-submit, answer review
- **Admin Dashboard** – Analytics charts (Recharts), recent activity, score distribution
- **Question Management** – Add/Edit/Delete questions with modal UI
- **User Management** – Searchable user table with attempt history
- **Dark Mode** – Toggle with persistent preference
- **Animations** – Framer Motion page transitions and micro-interactions
- **Toast Notifications** – react-hot-toast for success/error feedback

## 🛠 Tech Stack

| Library | Purpose |
|---|---|
| React 18 + Vite | UI framework + build tool |
| React Router DOM v6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client with JWT interceptor |
| Framer Motion | Smooth animations |
| Recharts | Analytics charts |
| react-hot-toast | Toast notifications |
| Context API | Authentication state |

## 🚀 Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend running at `http://localhost:5000/api`

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation + dark mode toggle
│   ├── ProtectedRoute.jsx  # Auth & role guard for routes
│   ├── QuestionCard.jsx    # Single quiz question w/ options
│   └── Loader.jsx          # Full-page + inline loaders
│
├── pages/
│   ├── Login.jsx           # Login form with validation
│   ├── Register.jsx        # Registration form
│   ├── Quiz.jsx            # Full quiz flow with timer
│   ├── Result.jsx          # Score display + answer review
│   ├── AdminDashboard.jsx  # Analytics + Recharts
│   └── ManageQuestions.jsx # CRUD for questions + user list
│
├── context/
│   └── AuthContext.jsx     # Auth state + login/logout
│
├── services/
│   └── api.js              # Axios instance + all API calls
│
├── App.jsx                 # Router + layout
└── main.jsx                # React entry point
```

## 🔌 API Endpoints Expected

### Auth
- `POST /api/auth/login` → `{ token, user }`
- `POST /api/auth/register` → `{ token, user }`
- `GET /api/auth/me` → `{ user }`

### Quiz
- `GET /api/quiz` → `{ questions: [...] }`
- `POST /api/quiz/submit` → `{ score, total, percentage, passed, answers, attemptsLeft }`

### Admin
- `GET /api/admin/stats` → dashboard analytics
- `GET /api/admin/activity` → recent attempts
- `GET /api/admin/questions` → question list
- `POST /api/admin/questions` → add question
- `PUT /api/admin/questions/:id` → update question
- `DELETE /api/admin/questions/:id` → delete question
- `GET /api/admin/users` → user list

## 🔐 Auth Flow

1. User registers / logs in → receives JWT
2. Token stored in `localStorage`
3. Axios request interceptor attaches `Authorization: Bearer <token>`
4. 401 responses auto-redirect to `/login` and clear storage
5. Admin routes check `user.role === 'admin'` via `ProtectedRoute`

## 🎨 Design System

- **Font**: Cabinet Grotesk (display) + DM Sans (body)
- **Primary**: Sky blue (`brand-500: #0ea5e9`)
- **Accent**: Orange (`accent-500: #f97316`)
- **Radius**: `rounded-2xl` / `rounded-3xl`
- **Shadows**: Soft card shadows + brand glow
- **Dark mode**: `class` strategy via Tailwind
