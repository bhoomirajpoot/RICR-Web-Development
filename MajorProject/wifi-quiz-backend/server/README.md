# 📡 QuizNet Backend – REST API

Node.js + Express + MongoDB backend for the Smart Quiz-Based WiFi Access Portal.

## 🚀 Quick Start

```bash
# 1. Navigate into server folder
cd server

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 4. Seed the database (optional but recommended)
npm run seed

# 5. Start development server
npm run dev
# → API running at http://localhost:5000
```

## ⚙️ Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `MONGO_URI` | `mongodb://localhost:27017/quiznet` | MongoDB connection string |
| `JWT_SECRET` | *(required)* | Minimum 32-char secret for signing tokens |
| `JWT_EXPIRES_IN` | `7d` | Token expiry |
| `QUIZ_QUESTION_COUNT` | `10` | Questions per quiz session |
| `QUIZ_PASS_PERCENTAGE` | `70` | Minimum % to pass |
| `QUIZ_MAX_ATTEMPTS` | `3` | Max attempts per user |
| `QUIZ_TIMER_SECONDS` | `30` | Seconds per question |
| `CORS_ORIGINS` | `http://localhost:5173` | Comma-separated allowed origins |

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                   # MongoDB connection
├── controllers/
│   ├── authController.js        # Register, Login, Me
│   ├── quizController.js        # Get questions, Submit
│   └── adminController.js      # Dashboard, Users, Questions CRUD
├── middleware/
│   ├── authMiddleware.js        # JWT protect middleware
│   ├── roleMiddleware.js        # Role-based authorize()
│   └── errorMiddleware.js      # Centralized error + 404
├── models/
│   ├── User.js                  # User schema + bcrypt
│   ├── Question.js              # Question schema
│   └── Result.js                # Quiz result + answer snapshot
├── routes/
│   ├── authRoutes.js
│   ├── quizRoutes.js
│   └── adminRoutes.js
├── utils/
│   ├── generateToken.js         # JWT generator
│   └── seed.js                  # Database seeder
├── .env.example
├── package.json
└── server.js                    # App entry point
```

## 📋 API Reference

### Health
| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/health` | None |

### Auth
| Method | Endpoint | Auth | Body |
|---|---|---|---|
| POST | `/api/auth/register` | None | `{ name, email, password }` |
| POST | `/api/auth/login` | None | `{ email, password }` |
| GET | `/api/auth/me` | Bearer | — |

### Quiz
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/quiz` | Bearer | Get randomized questions |
| POST | `/api/quiz/submit` | Bearer | Submit answers → score |
| GET | `/api/quiz/attempts/me` | Bearer | Get my attempt history |

**Submit body:**
```json
{
  "answers": [
    { "questionId": "...", "selectedOption": 2 },
    { "questionId": "...", "selectedOption": 0 }
  ]
}
```

### Admin (role: admin required)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/dashboard` | Full analytics data |
| GET | `/api/admin/stats` | Quick stat cards |
| GET | `/api/admin/activity` | Recent 20 attempts |
| GET | `/api/admin/users` | Paginated user list |
| GET | `/api/admin/users/:id/attempts` | User attempt history |
| GET | `/api/admin/questions` | All questions |
| POST | `/api/admin/questions` | Add question |
| PUT | `/api/admin/questions/:id` | Update question |
| DELETE | `/api/admin/questions/:id` | Delete question |

## 🔐 Auth Flow

```
Client                          Server
  │── POST /api/auth/login ───→  Verify email + bcrypt password
  │                              ↓
  │←── { token, user } ────────  Sign JWT (7d expiry)
  │
  │── GET /api/quiz ──────────→  authMiddleware: verify JWT
  │   Authorization: Bearer…     Attach req.user
  │
  │←── { questions } ──────────  Quiz data (no correctAnswer)
  │
  │── POST /api/quiz/submit ──→  Evaluate answers
  │                              Increment user.attempts
  │                              Save Result document
  │
  │←── { score, passed, … } ──  Result with answer review
```

## 📊 Response Envelope

All responses follow this format:
```json
{
  "success": true,
  "message": "Human-readable status",
  "data": { ... }
}
```

Error responses:
```json
{
  "success": false,
  "message": "What went wrong"
}
```

## 🌱 Seed Data

After running `npm run seed`:

| Role | Email | Password |
|---|---|---|
| Admin | admin@quiznet.com | Admin@123 |
| User | user@quiznet.com | User@123 |

20 sample questions across: Technology, Science, Math, Geography, History.

## 🚢 Deploy to Render + MongoDB Atlas

1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `node server.js`
3. Add environment variables in Render dashboard
4. Set `MONGO_URI` to your Atlas connection string
5. Set `NODE_ENV=production`
6. Set `CORS_ORIGINS` to your deployed frontend URL
