/**
 * Seed script – run once to populate the database.
 * Usage: npm run seed
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const User = require('../models/User');
const Question = require('../models/Question');

const sampleQuestions = [
  {
    question: 'What does WiFi stand for?',
    options: ['Wireless Fidelity', 'Wide Frequency Interface', 'Wire-Free Internet', 'Wireless Facility Index'],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'Technology',
  },
  {
    question: 'Which protocol is used to assign IP addresses automatically on a network?',
    options: ['FTP', 'DHCP', 'DNS', 'HTTP'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Technology',
  },
  {
    question: 'What is the capital city of Japan?',
    options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'Geography',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Jupiter', 'Saturn', 'Mars'],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'Science',
  },
  {
    question: 'What element has the chemical symbol "Au"?',
    options: ['Silver', 'Aluminum', 'Gold', 'Argon'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'Science',
  },
  {
    question: 'In what year did the World Wide Web become publicly available?',
    options: ['1985', '1989', '1991', '1995'],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'History',
  },
  {
    question: 'Which data structure uses LIFO (Last In, First Out) ordering?',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'Technology',
  },
  {
    question: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Math',
  },
  {
    question: 'Which country has the largest land area in the world?',
    options: ['Canada', 'China', 'USA', 'Russia'],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'Geography',
  },
  {
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'Technology',
  },
  {
    question: 'Which OSI layer is responsible for routing packets?',
    options: ['Data Link', 'Transport', 'Network', 'Session'],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'Technology',
  },
  {
    question: 'What does DNS stand for?',
    options: ['Data Network Service', 'Domain Name System', 'Digital Node Server', 'Distributed Network Setup'],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'Technology',
  },
];

const seed = async () => {
  await connectDB();

  console.log('🌱  Seeding database...');

  // Clear existing
  await Question.deleteMany({});
  await User.deleteMany({ email: { $in: ['admin@quiznet.com', 'user@quiznet.com'] } });

  // Insert questions
  const questions = await Question.insertMany(sampleQuestions);
  console.log(`✅  Inserted ${questions.length} questions`);

  // Create admin user
  const adminPass = await bcrypt.hash('admin123', 12);
  await User.create({
    name: 'Admin User',
    email: 'admin@quiznet.com',
    password: adminPass,
    role: 'admin',
  });
  console.log('✅  Admin user created: admin@quiznet.com / admin123');

  // Create demo user
  const userPass = await bcrypt.hash('user123', 12);
  await User.create({
    name: 'Demo User',
    email: 'user@quiznet.com',
    password: userPass,
    role: 'user',
  });
  console.log('✅  Demo user created: user@quiznet.com / user123');

  console.log('\n🎉  Seeding complete!');
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
