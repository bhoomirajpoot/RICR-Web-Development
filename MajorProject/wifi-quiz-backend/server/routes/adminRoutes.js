const express = require('express');
const { body, param } = require('express-validator');
const {
  getDashboard,
  getUsers,
  getUserAttempts,
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getActivity,
  getStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// All admin routes: authenticated + admin role
router.use(protect, authorize('admin'));

// ── Validation ────────────────────────────────────────────────
const questionRules = [
  body('question').trim().notEmpty().withMessage('Question text is required').isLength({ min: 5 }),
  body('options').isArray({ min: 2, max: 6 }).withMessage('Options must be an array of 2–6 items'),
  body('options.*').trim().notEmpty().withMessage('Options cannot be empty'),
  body('correctAnswer').isInt({ min: 0 }).withMessage('correctAnswer must be a valid index'),
  body('difficulty').optional().isIn(['easy', 'medium', 'hard']),
];

// ── Dashboard ─────────────────────────────────────────────────
router.get('/dashboard', getDashboard);
router.get('/stats', getStats);
router.get('/activity', getActivity);

// ── Users ─────────────────────────────────────────────────────
router.get('/users', getUsers);
router.get('/users/:id/attempts', getUserAttempts);

// ── Questions CRUD ────────────────────────────────────────────
router.get('/questions', getQuestions);
router.post('/questions', questionRules, addQuestion);
router.put('/questions/:id', questionRules, updateQuestion);
router.delete('/questions/:id', deleteQuestion);

module.exports = router;
