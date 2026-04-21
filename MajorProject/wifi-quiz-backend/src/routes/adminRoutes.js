const router = require('express').Router();
const { body } = require('express-validator');
const {
  getStats,
  getRecentActivity,
  getUsers,
  getUserAttempts,
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// Dashboard
router.get('/stats', getStats);
router.get('/activity', getRecentActivity);

// User management
router.get('/users', getUsers);
router.get('/users/:id/attempts', getUserAttempts);

// Question management
const questionRules = [
  body('question').trim().notEmpty().withMessage('Question text is required'),
  body('options').isArray({ min: 4, max: 4 }).withMessage('Exactly 4 options required'),
  body('options.*').trim().notEmpty().withMessage('All options must be non-empty'),
  body('correctAnswer').isInt({ min: 0, max: 3 }).withMessage('correctAnswer must be 0-3'),
  body('difficulty').optional().isIn(['easy', 'medium', 'hard']),
  body('category').optional().trim(),
];

router.get('/questions', getQuestions);
router.post('/questions', questionRules, addQuestion);
router.put('/questions/:id', questionRules, updateQuestion);
router.delete('/questions/:id', deleteQuestion);

module.exports = router;
