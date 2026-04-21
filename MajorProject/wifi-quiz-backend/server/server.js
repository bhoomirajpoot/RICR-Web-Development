/**
 * QuizNet Backend – Entry Point
 * Smart Quiz-Based WiFi Access Portal
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const { errorMiddleware, notFoundMiddleware } = require('./middleware/errorMiddleware');

// ── Routes ────────────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const adminRoutes = require('./routes/adminRoutes');

// ── Connect to MongoDB ────────────────────────────────────────
connectDB();

const app = express();

// ── CORS ──────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ── Request Logging ───────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ── Body Parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Prevent large payload attacks
app.use(express.urlencoded({ extended: true }));

// ── Global Rate Limiter ───────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  message: { success: false, message: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/api/health', // Don't rate-limit health checks
});
app.use(globalLimiter);

// ── Health Check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'QuizNet API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/admin', adminRoutes);

// ── 404 + Error Handling ──────────────────────────────────────
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// ── Start Server ──────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '5000', 10);

const server = app.listen(PORT, () => {
  console.log(`\n🚀  QuizNet API running on port ${PORT}`);
  console.log(`📌  Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐  Health check: http://localhost:${PORT}/api/health\n`);
});

// ── Graceful Shutdown ─────────────────────────────────────────
process.on('unhandledRejection', (err) => {
  console.error('❌  Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('📴  SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅  Process terminated.');
    process.exit(0);
  });
});

module.exports = app; // For testing
