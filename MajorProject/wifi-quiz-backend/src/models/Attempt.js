const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selectedOption: { type: Number, required: true, min: 0, max: 3 },
  isCorrect: { type: Boolean, required: true },
});

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answers: [answerSchema],
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    timeTaken: {
      type: Number, // seconds
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for efficient admin queries
attemptSchema.index({ user: 1, createdAt: -1 });
attemptSchema.index({ createdAt: -1 });
attemptSchema.index({ passed: 1 });

module.exports = mongoose.model('Attempt', attemptSchema);
