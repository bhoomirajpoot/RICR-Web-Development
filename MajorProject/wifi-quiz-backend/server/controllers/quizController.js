const { validationResult } = require('express-validator');
const Question = require('../models/Question');
const Result = require('../models/Result');
const User = require('../models/User');

// ── Quiz Configuration ────────────────────────────────────────
const getConfig = () => ({
  questionCount: parseInt(process.env.QUIZ_QUESTION_COUNT || '10', 10),
  passPercentage: parseInt(process.env.QUIZ_PASS_PERCENTAGE || '70', 10),
  maxAttempts: parseInt(process.env.QUIZ_MAX_ATTEMPTS || '3', 10),
  timerSeconds: parseInt(process.env.QUIZ_TIMER_SECONDS || '30', 10),
});

/**
 * GET /api/quiz
 * Protected – Return a randomised set of questions (without correct answers)
 */
const getQuestions = async (req, res, next) => {
  try {
    const { questionCount, maxAttempts } = getConfig();
    const user = req.user;

    // Enforce attempt limit
    if (user.attempts >= maxAttempts) {
      return res.status(403).json({
        success: false,
        message: `You have reached the maximum number of attempts (${maxAttempts}).`,
        data: { attemptsLeft: 0 },
      });
    }

    // Random question selection using aggregation $sample
    const questions = await Question.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: questionCount } },
      {
        $project: {
          question: 1,
          options: 1,
          difficulty: 1,
          category: 1,
          // correctAnswer is intentionally excluded
        },
      },
    ]);

    if (!questions.length) {
      return res.status(404).json({ success: false, message: 'No questions available.' });
    }

    res.json({
      success: true,
      data: {
        questions,
        config: {
          timerSeconds: getConfig().timerSeconds,
          totalQuestions: questions.length,
          passPercentage: getConfig().passPercentage,
          attemptsLeft: Math.max(0, maxAttempts - user.attempts),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/quiz/submit
 * Protected – Evaluate answers, save result, increment attempt counter
 *
 * Body: { answers: [{ questionId, selectedOption }] }
 */
const submitQuiz = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: errors.array()[0].msg });
    }

    const { answers } = req.body;
    const user = req.user;
    const { passPercentage, maxAttempts } = getConfig();

    // Re-check attempt limit
    if (user.attempts >= maxAttempts) {
      return res.status(403).json({
        success: false,
        message: `Maximum attempts (${maxAttempts}) reached.`,
      });
    }

    // Fetch the actual questions for evaluation
    const questionIds = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds }, isActive: true });

    if (!questions.length) {
      return res.status(400).json({ success: false, message: 'No valid questions found in submission.' });
    }

    // Map for quick lookup
    const questionMap = {};
    questions.forEach((q) => { questionMap[q._id.toString()] = q; });

    // Evaluate each answer
    let score = 0;
    const evaluatedAnswers = answers.map((a) => {
      const q = questionMap[a.questionId?.toString()];
      if (!q) return null; // Question not found / inactive

      const correct = a.selectedOption === q.correctAnswer;
      if (correct) score++;

      return {
        questionId: q._id,
        question: q.question,
        selectedOption: a.selectedOption,
        selectedAnswer: q.options[a.selectedOption] ?? 'No answer',
        correctAnswer: q.options[q.correctAnswer],
        correct,
      };
    }).filter(Boolean);

    const totalQuestions = evaluatedAnswers.length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const passed = percentage >= passPercentage;

    // Increment user attempt count atomically
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $inc: { attempts: 1 },
        lastIp: req.ip,
      },
      { new: true }
    );

    // Save result
    const result = await Result.create({
      userId: user._id,
      score,
      totalQuestions,
      percentage,
      passed,
      attemptNumber: updatedUser.attempts,
      answers: evaluatedAnswers,
      ipAddress: req.ip,
    });

    const attemptsLeft = Math.max(0, maxAttempts - updatedUser.attempts);

    res.status(201).json({
      success: true,
      message: passed ? 'Congratulations! You passed.' : 'Better luck next time.',
      data: {
        resultId: result._id,
        score,
        total: totalQuestions,
        percentage,
        passed,
        attemptNumber: updatedUser.attempts,
        attemptsLeft,
        answers: evaluatedAnswers.map((a) => ({
          question: a.question,
          selectedAnswer: a.selectedAnswer,
          correctAnswer: a.correctAnswer,
          correct: a.correct,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/quiz/attempts/me
 * Protected – Return all attempts for the authenticated user
 */
const getMyAttempts = async (req, res, next) => {
  try {
    const results = await Result.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-answers'); // Exclude full answer details for the list view

    res.json({
      success: true,
      data: { results, total: results.length },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getQuestions, submitQuiz, getMyAttempts };
