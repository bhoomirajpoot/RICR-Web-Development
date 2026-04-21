const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// ── Helper: format user for response ─────────────────────────
const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  attempts: user.attempts,
  createdAt: user.createdAt,
});

/**
 * POST /api/auth/register
 * Public – Create new user account
 */
const register = async (req, res, next) => {
  try {
    // Express-validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: errors.array()[0].msg, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Duplicate check (belt & suspenders over unique index)
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: { token, user: formatUser(user) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Public – Authenticate user and return JWT
 */
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    // Fetch user WITH password (select: false on schema)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Your account has been deactivated.' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful.',
      data: { token, user: formatUser(user) },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Protected – Return currently authenticated user
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({ success: true, data: { user: formatUser(user) } });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
