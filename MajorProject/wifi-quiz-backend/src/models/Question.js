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
        validator: (v) => v.length === 4 && v.every((o) => o.trim().length > 0),
        message: 'Exactly 4 non-empty options are required',
      },
    },
    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
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

// Index for efficient random sampling and category filtering
questionSchema.index({ isActive: 1, difficulty: 1, category: 1 });

module.exports = mongoose.model('Question', questionSchema);
