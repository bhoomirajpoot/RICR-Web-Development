const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
      minlength: [5, 'Question must be at least 5 characters'],
    },
    options: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 2 && arr.length <= 6,
        message: 'A question must have between 2 and 6 options',
      },
      required: [true, 'Options are required'],
    },
    correctAnswer: {
      type: Number, // Index into options array (0-based)
      required: [true, 'Correct answer index is required'],
      min: [0, 'correctAnswer must be a valid option index'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Only serve active questions
questionSchema.index({ isActive: 1, difficulty: 1 });

module.exports = mongoose.model('Question', questionSchema);
