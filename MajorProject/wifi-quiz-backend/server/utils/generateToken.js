const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT for the given user id.
 * @param {string} id - MongoDB ObjectId string
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = generateToken;
