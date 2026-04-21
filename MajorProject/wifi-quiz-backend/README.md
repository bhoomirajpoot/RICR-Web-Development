# 📡 QuizNet – Backend API

Express.js + MongoDB REST API for the QuizNet WiFi captive portal.

## 🛠 Tech Stack

| Library | Purpose |
|---|---|
| Express.js | Web framework |
| Mongoose | MongoDB ODM |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT auth |
| express-validator | Input validation |
| express-rate-limit | Brute-force protection |
| morgan | HTTP request logging |
| dotenv | Environment config |
| nodemon | Dev auto-reload |

## 🚀 Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally OR a MongoDB Atlas URI

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 3. Seed the database (creates admin + demo user + sample questions)
npm run seed

# 4. Start dev server
npm run dev

# Server runs at http://localhost:5000
```

### Default Seed Credentials
| Role | Email | Password |
|---|---|---|
| Admin | admin@quiznet.com | admin123 |
| User | user@quiznet.com | user123 |

## 📁 Project Structure

```
src/
├── config/
│   ├── db.js           # MongoDB connection
│   └── seed.js         # Database seeder
│
├── controllers/
│   ├── authController.js    # register, login, me
│   ├── quizController.js    # get questions, submit, my attempts
│   └── adminController.js   # stats, users, questions CRUD
│
├── middleware/
│   ├── auth.js          # protect + adminOnly guards
│   └── errorHandler.js  # centralized error responses
│
├── models/
│   ├── User.js          # name, email, password, role, dailyAttempts
│   ├── Question.js      # question, options[4], correctAnswer, difficulty, category
│   └── Attempt.js       # user, answers[], score, percentage, passed
│
├── routes/
│   ├── authRoutes.js    # /api/auth
│   ├── quizRoutes.js    # /api/quiz
│   └── adminRoutes.js   # /api/admin
│
└── server.js            # Express app + middleware + start
```

## 🔌 API Reference

### Auth – `/api/auth`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/register` | — | Register new user |
| POST | `/login` | — | Login, receive JWT |
| GET | `/me` | ✅ | Get current user |

### Quiz – `/api/quiz`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | ✅ | Get random questions (correctAnswer hidden) |
| POST | `/submit` | ✅ | Submit answers, receive score + review |
| GET | `/attempts/me` | ✅ | Get own attempt history |

### Admin – `/api/admin`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/stats` | 🔒 Admin | Dashboard analytics |
| GET | `/activity` | 🔒 Admin | Recent 10 attempts |
| GET | `/users` | 🔒 Admin | User list (search, paginate) |
| GET | `/users/:id/attempts` | 🔒 Admin | Specific user attempts |
| GET | `/questions` | 🔒 Admin | All questions |
| POST | `/questions` | 🔒 Admin | Add question |
| PUT | `/questions/:id` | 🔒 Admin | Update question |
| DELETE | `/questions/:id` | 🔒 Admin | Delete question |

### Health
| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Server status check |

## 🔐 Security Features

- Passwords hashed with bcryptjs (12 rounds)
- JWT stored only in frontend localStorage (never in cookies by default)
- Rate limiting: 200 req/15min globally, 20 req/15min on auth routes
- Admin-only routes protected by role check middleware
- `correctAnswer` field excluded from quiz question responses
- Daily attempt limit enforced server-side (configurable via `.env`)
- Input validation on all write endpoints via express-validator
- MongoDB injection protection via Mongoose schema types

## ⚙️ Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | 5000 | Server port |
| `NODE_ENV` | development | Environment |
| `MONGO_URI` | — | MongoDB connection string |
| `JWT_SECRET` | — | Secret for signing tokens |
| `JWT_EXPIRES_IN` | 7d | Token expiry |
| `PASS_THRESHOLD` | 70 | Min % score to pass quiz |
| `MAX_ATTEMPTS_PER_DAY` | 3 | Quiz attempts per user/day |
| `QUESTIONS_PER_QUIZ` | 10 | Questions served per session |
| `CLIENT_URL` | http://localhost:5173 | CORS origin |
