const router = require('express').Router();
const { getQuestions, submitQuiz, getMyAttempts } = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

// All quiz routes require authentication
router.use(protect);

router.get('/', getQuestions);
router.post('/submit', submitQuiz);
router.get('/attempts/me', getMyAttempts);

module.exports = router;
