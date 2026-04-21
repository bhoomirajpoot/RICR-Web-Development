const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    question: { type: String },          // Snapshot at time of attempt
    selectedOption: { type: Number },    // Index chosen by user
    selectedAnswer: { type: String },    // Text of chosen option
    correctAnswer: { type: String },     // Text of correct option
    correct: { type: Boolean },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number, // 0-100
      required: true,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    attemptNumber: {
      type: Number,
      required: true,
    },
    answers: [answerSchema],
    ipAddress: {
      type: String,
      default: null,
    },
    timeTaken: {
      type: Number, // Seconds
      default: null,
    },
  },
  { timestamps: true }
);

resultSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Result', resultSchema);
