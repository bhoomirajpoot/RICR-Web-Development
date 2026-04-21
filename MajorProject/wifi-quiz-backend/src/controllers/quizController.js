const Question = require('../models/Question');
const Attempt = require('../models/Attempt');

const PASS_THRESHOLD = Number(process.env.PASS_THRESHOLD) || 70;
const MAX_ATTEMPTS = Number(process.env.MAX_ATTEMPTS_PER_DAY) || 3;
const QUESTIONS_PER_QUIZ = Number(process.env.QUESTIONS_PER_QUIZ) || 10;

/** Returns today's date as YYYY-MM-DD */
const todayStr = () => new Date().toISOString().split('T')[0];

// ─── GET /api/quiz ────────────────────────────────────────────────────────────
// Returns a randomized set of questions (correctAnswer field EXCLUDED)
exports.getQuestions = async (req, res, next) => {
  try {
    const user = req.user;

    // Enforce daily attempt limit
    if (user.dailyAttempts.date === todayStr() && user.dailyAttempts.count >= MAX_ATTEMPTS) {
      return res.status(429).json({
        message: `Daily attempt limit reached (${MAX_ATTEMPTS}/day). Try again tomorrow.`,
      });
    }

    // Fetch random active questions using aggregation
    const questions = await Question.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: QUESTIONS_PER_QUIZ } },
      { $project: { correctAnswer: 0, __v: 0 } }, // hide answer
    ]);

    if (!questions.length) {
      return res.status(404).json({ message: 'No questions available.' });
    }

    res.json({ questions, total: questions.length });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/quiz/submit ────────────────────────────────────────────────────
// Body: { answers: [{ questionId, selectedOption }] }
exports.submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'Answers array is required.' });
    }

    // Check daily limit
    const user = req.user;
    if (user.dailyAttempts.date === todayStr() && user.dailyAttempts.count >= MAX_ATTEMPTS) {
      return res.status(429).json({ message: 'Daily attempt limit reached.' });
    }

    // Fetch all answered questions WITH correctAnswer
    const questionIds = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    const questionMap = {};
    questions.forEach((q) => { questionMap[q._id.toString()] = q; });

    // Grade answers
    let score = 0;
    const gradedAnswers = answers.map((ans) => {
      const q = questionMap[ans.questionId];
      if (!q) return null;
      const isCorrect = Number(ans.selectedOption) === q.correctAnswer;
      if (isCorrect) score++;
      return {
        questionId: q._id,
        selectedOption: ans.selectedOption,
        isCorrect,
      };
    }).filter(Boolean);

    const total = gradedAnswers.length;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const passed = percentage >= PASS_THRESHOLD;

    // Save attempt
    await Attempt.create({
      user: user._id,
      answers: gradedAnswers,
      score,
      total,
      percentage,
      passed,
    });

    // Update daily attempt counter
    const today = todayStr();
    if (user.dailyAttempts.date !== today) {
      user.dailyAttempts = { count: 1, date: today };
    } else {
      user.dailyAttempts.count += 1;
    }
    await user.save({ validateBeforeSave: false });

    // Build answer review (show what was right/wrong)
    const reviewAnswers = gradedAnswers.map((ga) => {
      const q = questionMap[ga.questionId.toString()];
      return {
        question: q.question,
        selectedAnswer: q.options[ga.selectedOption],
        correctAnswer: q.options[q.correctAnswer],
        correct: ga.isCorrect,
      };
    });

    const attemptsLeft = Math.max(0, MAX_ATTEMPTS - user.dailyAttempts.count);

    res.json({
      score,
      total,
      percentage,
      passed,
      answers: reviewAnswers,
      attemptsLeft,
      message: passed
        ? '🎉 Congratulations! WiFi access granted.'
        : `Score too low. You need ${PASS_THRESHOLD}% to pass.`,
    });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/quiz/attempts/me ────────────────────────────────────────────────
exports.getMyAttempts = async (req, res, next) => {
  try {
    const attempts = await Attempt.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-answers');

    res.json({ attempts });
  } catch (err) {
    next(err);
  }
};
