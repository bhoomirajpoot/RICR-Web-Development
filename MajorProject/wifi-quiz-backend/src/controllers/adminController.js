const { validationResult } = require('express-validator');
const User = require('../models/User');
const Question = require('../models/Question');
const Attempt = require('../models/Attempt');

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
exports.getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalAttempts, passCount] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Attempt.countDocuments(),
      Attempt.countDocuments({ passed: true }),
    ]);

    const passRate = totalAttempts > 0 ? Math.round((passCount / totalAttempts) * 100) : 0;

    // Average score
    const avgResult = await Attempt.aggregate([
      { $group: { _id: null, avg: { $avg: '$percentage' } } },
    ]);
    const avgScore = avgResult.length ? Math.round(avgResult[0].avg) : 0;

    // Attempts per day for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const dailyAttempts = await Attempt.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          attempts: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill in missing days
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const attemptsOverTime = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const found = dailyAttempts.find((a) => a._id === key);
      attemptsOverTime.push({ date: days[d.getDay()], attempts: found ? found.attempts : 0 });
    }

    // Score distribution buckets
    const scoreDistribution = await Attempt.aggregate([
      {
        $bucket: {
          groupBy: '$percentage',
          boundaries: [0, 26, 51, 76, 101],
          default: 'other',
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    const bucketLabels = ['0-25%', '26-50%', '51-75%', '76-100%'];
    const scoreDistributionFormatted = bucketLabels.map((name, i) => ({
      name,
      count: scoreDistribution[i]?.count || 0,
    }));

    res.json({
      totalUsers,
      totalAttempts,
      passRate,
      avgScore,
      attemptsOverTime,
      scoreDistribution: scoreDistributionFormatted,
      passFail: [
        { name: 'Passed', value: passCount },
        { name: 'Failed', value: totalAttempts - passCount },
      ],
    });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/admin/activity ──────────────────────────────────────────────────
exports.getRecentActivity = async (req, res, next) => {
  try {
    const attempts = await Attempt.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email')
      .select('user score total percentage passed createdAt');

    const activity = attempts.map((a) => ({
      user: a.user?.name || 'Unknown',
      email: a.user?.email || '',
      score: `${a.percentage}%`,
      status: a.passed ? 'Passed' : 'Failed',
      time: timeAgo(a.createdAt),
    }));

    res.json({ activity });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
exports.getUsers = async (req, res, next) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;

    const query = search
      ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] }
      : {};

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      User.countDocuments(query),
    ]);

    // Attach attempt stats
    const userIds = users.map((u) => u._id);
    const attemptStats = await Attempt.aggregate([
      { $match: { user: { $in: userIds } } },
      {
        $group: {
          _id: '$user',
          attempts: { $sum: 1 },
          bestScore: { $max: '$percentage' },
        },
      },
    ]);

    const statsMap = {};
    attemptStats.forEach((s) => { statsMap[s._id.toString()] = s; });

    const enriched = users.map((u) => {
      const stats = statsMap[u._id.toString()] || {};
      return {
        ...u.toPublic(),
        attempts: stats.attempts || 0,
        bestScore: stats.bestScore || null,
      };
    });

    res.json({ users: enriched, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/admin/users/:id/attempts ───────────────────────────────────────
exports.getUserAttempts = async (req, res, next) => {
  try {
    const attempts = await Attempt.find({ user: req.params.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-answers');

    res.json({ attempts });
  } catch (err) {
    next(err);
  }
};

// ─── GET /api/admin/questions ─────────────────────────────────────────────────
exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json({ questions, total: questions.length });
  } catch (err) {
    next(err);
  }
};

// ─── POST /api/admin/questions ────────────────────────────────────────────────
exports.addQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const question = await Question.create(req.body);
    res.status(201).json({ message: 'Question added', question });
  } catch (err) {
    next(err);
  }
};

// ─── PUT /api/admin/questions/:id ─────────────────────────────────────────────
exports.updateQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!question) return res.status(404).json({ message: 'Question not found.' });
    res.json({ message: 'Question updated', question });
  } catch (err) {
    next(err);
  }
};

// ─── DELETE /api/admin/questions/:id ─────────────────────────────────────────
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found.' });
    res.json({ message: 'Question deleted' });
  } catch (err) {
    next(err);
  }
};

// ─── Utility ──────────────────────────────────────────────────────────────────
function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
