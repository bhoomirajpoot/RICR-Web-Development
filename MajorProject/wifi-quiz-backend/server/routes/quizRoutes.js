const express = require('express');
const { body } = require('express-validator');
const { getQuestions, submitQuiz, getMyAttempts } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All quiz routes require authentication
router.use(protect);

const submitRules = [
  body('answers').isArray({ min: 1 }).withMessage('Answers must be a non-empty array'),
  body('answers.*.questionId').notEmpty().withMessage('Each answer must have a questionId'),
  body('answers.*.selectedOption')
    .isInt({ min: 0 })
    .withMessage('selectedOption must be a non-negative integer'),
];

router.get('/', getQuestions);
router.post('/submit', submitRules, submitQuiz);
router.get('/attempts/me', getMyAttempts);

module.exports = router;
