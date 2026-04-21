const { validationResult } = require('express-validator');
const User = require('../models/User');
const Question = require('../models/Question');
const Result = require('../models/Result');

// ──────────────────────────────────────────────────────────────
// DASHBOARD / ANALYTICS
// ──────────────────────────────────────────────────────────────

/**
 * GET /api/admin/dashboard
 * Returns high-level stats + charts data for the admin UI
 */
const getDashboard = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalAttempts,
      passCount,
      scoreAgg,
      recentResults,
      attemptsOverTime,
      scoreDistribution,
    ] = await Promise.all([
      // Total registered users
      User.countDocuments({ role: 'user' }),

      // Total quiz submissions
      Result.countDocuments(),

      // How many passed
      Result.countDocuments({ passed: true }),

      // Average score
      Result.aggregate([
        { $group: { _id: null, avgScore: { $avg: '$percentage' } } },
      ]),

      // Recent 10 attempts with user info
      Result.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('userId', 'name email')
        .select('userId score percentage passed createdAt attemptNumber'),

      // Attempts per day – last 7 days
      Result.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%a', date: '$createdAt' } },
            attempts: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { date: '$_id', attempts: 1, _id: 0 } },
      ]),

      // Score distribution buckets: 0-25, 26-50, 51-75, 76-100
      Result.aggregate([
        {
          $bucket: {
            groupBy: '$percentage',
            boundaries: [0, 26, 51, 76, 101],
            default: 'Other',
            output: { count: { $sum: 1 } },
          },
        },
        {
          $project: {
            _id: 0,
            name: {
              $switch: {
                branches: [
                  { case: { $eq: ['$_id', 0] }, then: '0-25%' },
                  { case: { $eq: ['$_id', 26] }, then: '26-50%' },
                  { case: { $eq: ['$_id', 51] }, then: '51-75%' },
                  { case: { $eq: ['$_id', 76] }, then: '76-100%' },
                ],
                default: 'Other',
              },
            },
            count: 1,
          },
        },
      ]),
    ]);

    const passRate = totalAttempts > 0 ? Math.round((passCount / totalAttempts) * 100) : 0;
    const avgScore = scoreAgg[0] ? Math.round(scoreAgg[0].avgScore) : 0;

    // Format recent activity for frontend table
    const activity = recentResults.map((r) => ({
      user: r.userId?.name || 'Deleted User',
      email: r.userId?.email || '—',
      score: `${r.percentage}%`,
      status: r.passed ? 'Passed' : 'Failed',
      time: timeAgo(r.createdAt),
    }));

    res.json({
      success: true,
      data: {
        totalUsers,
        totalAttempts,
        passRate,
        avgScore,
        attemptsOverTime,
        scoreDistribution,
        passFail: [
          { name: 'Passed', value: passCount },
          { name: 'Failed', value: totalAttempts - passCount },
        ],
        activity,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────────
// USERS
// ──────────────────────────────────────────────────────────────

/**
 * GET /api/admin/users?search=&page=1&limit=20
 */
const getUsers = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-password'),
      User.countDocuments(query),
    ]);

    // Attach best score from results
    const userIds = users.map((u) => u._id);
    const bestScores = await Result.aggregate([
      { $match: { userId: { $in: userIds } } },
      { $group: { _id: '$userId', bestScore: { $max: '$percentage' }, attempts: { $sum: 1 } } },
    ]);
    const scoreMap = {};
    bestScores.forEach((s) => { scoreMap[s._id.toString()] = s; });

    const enriched = users.map((u) => ({
      ...u.toObject(),
      bestScore: scoreMap[u._id.toString()]?.bestScore ?? null,
      totalAttempts: scoreMap[u._id.toString()]?.attempts ?? 0,
    }));

    res.json({
      success: true,
      data: {
        users: enriched,
        pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/users/:id/attempts
 */
const getUserAttempts = async (req, res, next) => {
  try {
    const results = await Result.find({ userId: req.params.id })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: { results } });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────────
// QUESTIONS CRUD
// ──────────────────────────────────────────────────────────────

/**
 * GET /api/admin/questions
 */
const getQuestions = async (req, res, next) => {
  try {
    const { category, difficulty, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [questions, total] = await Promise.all([
      Question.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Question.countDocuments(filter),
    ]);

    res.json({ success: true, data: { questions, total } });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/questions
 */
const addQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: errors.array()[0].msg });
    }

    const question = await Question.create(req.body);
    res.status(201).json({ success: true, message: 'Question added.', data: { question } });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/admin/questions/:id
 */
const updateQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: errors.array()[0].msg });
    }

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }

    res.json({ success: true, message: 'Question updated.', data: { question } });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/admin/questions/:id
 */
const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }
    res.json({ success: true, message: 'Question deleted.' });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/activity
 */
const getActivity = async (req, res, next) => {
  try {
    const results = await Result.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('userId', 'name email')
      .select('userId percentage passed createdAt');

    const activity = results.map((r) => ({
      user: r.userId?.name || 'Deleted User',
      email: r.userId?.email || '—',
      score: `${r.percentage}%`,
      status: r.passed ? 'Passed' : 'Failed',
      time: timeAgo(r.createdAt),
    }));

    res.json({ success: true, data: { activity } });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/stats – Alias for quick stat cards
 */
const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalAttempts, passCount, scoreAgg] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Result.countDocuments(),
      Result.countDocuments({ passed: true }),
      Result.aggregate([{ $group: { _id: null, avg: { $avg: '$percentage' } } }]),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalAttempts,
        passRate: totalAttempts ? Math.round((passCount / totalAttempts) * 100) : 0,
        avgScore: scoreAgg[0] ? Math.round(scoreAgg[0].avg) : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ── Utility: relative time string ────────────────────────────
function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

module.exports = {
  getDashboard,
  getUsers,
  getUserAttempts,
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getActivity,
  getStats,
};
