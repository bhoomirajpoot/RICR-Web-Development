/**
 * Seed Script
 * Run: node utils/seed.js
 *
 * Creates:
 *   - 1 admin user (admin@quiznet.com / Admin@123)
 *   - 1 test user  (user@quiznet.com  / User@123)
 *   - 20 sample questions across categories
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Question = require('../models/Question');
const Result = require('../models/Result');

const SAMPLE_QUESTIONS = [
  // Technology
  { question: 'What does WiFi stand for?', options: ['Wireless Fidelity', 'Wide Frequency Interface', 'Wire-Free Internet', 'Wireless Facility'], correctAnswer: 0, difficulty: 'easy', category: 'Technology' },
  { question: 'Which protocol is used to assign IP addresses automatically?', options: ['FTP', 'SMTP', 'DHCP', 'DNS'], correctAnswer: 2, difficulty: 'medium', category: 'Technology' },
  { question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'High Transfer Text Program', 'Hyper Transport Protocol', 'HyperText Transmission Process'], correctAnswer: 0, difficulty: 'easy', category: 'Technology' },
  { question: 'What is the default port for HTTPS?', options: ['80', '21', '443', '8080'], correctAnswer: 2, difficulty: 'medium', category: 'Technology' },
  { question: 'Which data structure uses LIFO order?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correctAnswer: 1, difficulty: 'medium', category: 'Technology' },

  // Science
  { question: 'What is the chemical symbol for water?', options: ['WA', 'H2O', 'HO2', 'OHH'], correctAnswer: 1, difficulty: 'easy', category: 'Science' },
  { question: 'How many planets are in our solar system?', options: ['7', '8', '9', '10'], correctAnswer: 1, difficulty: 'easy', category: 'Science' },
  { question: 'What is the speed of light (approx) in km/s?', options: ['150,000', '300,000', '500,000', '200,000'], correctAnswer: 1, difficulty: 'medium', category: 'Science' },
  { question: 'Which element has the symbol Au?', options: ['Silver', 'Copper', 'Gold', 'Iron'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },
  { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'], correctAnswer: 2, difficulty: 'easy', category: 'Science' },

  // Math
  { question: 'What is the value of π (pi) to two decimal places?', options: ['3.12', '3.14', '3.16', '3.18'], correctAnswer: 1, difficulty: 'easy', category: 'Math' },
  { question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correctAnswer: 2, difficulty: 'easy', category: 'Math' },
  { question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: 2, difficulty: 'easy', category: 'Math' },
  { question: 'How many degrees are in a triangle?', options: ['90', '180', '270', '360'], correctAnswer: 1, difficulty: 'easy', category: 'Math' },
  { question: 'What is 2^10?', options: ['512', '1024', '2048', '256'], correctAnswer: 1, difficulty: 'medium', category: 'Math' },

  // Geography
  { question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correctAnswer: 2, difficulty: 'medium', category: 'Geography' },
  { question: 'Which is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correctAnswer: 3, difficulty: 'easy', category: 'Geography' },
  { question: 'Which country has the largest population?', options: ['USA', 'China', 'India', 'Russia'], correctAnswer: 2, difficulty: 'easy', category: 'Geography' },

  // General
  { question: 'Which year did World War II end?', options: ['1943', '1944', '1945', '1946'], correctAnswer: 2, difficulty: 'medium', category: 'History' },
  { question: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], correctAnswer: 1, difficulty: 'easy', category: 'General' },
];

async function seed() {
  try {
    await connectDB();
    console.log('\n🌱  Starting seed...\n');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Question.deleteMany({}),
      Result.deleteMany({}),
    ]);
    console.log('🗑   Cleared existing data.');

    // Create admin user (password will be hashed by pre-save hook)
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@quiznet.com',
      password: 'Admin@123',
      role: 'admin',
    });
    console.log(`👤  Admin created: ${admin.email}`);

    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: 'user@quiznet.com',
      password: 'User@123',
      role: 'user',
    });
    console.log(`👤  Test user created: ${user.email}`);

    // Seed questions
    await Question.insertMany(SAMPLE_QUESTIONS);
    console.log(`❓  ${SAMPLE_QUESTIONS.length} questions seeded.`);

    console.log('\n✅  Seed complete!\n');
    console.log('─────────────────────────────────────────');
    console.log(' Admin login : admin@quiznet.com / Admin@123');
    console.log(' User login  : user@quiznet.com  / User@123');
    console.log('─────────────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('❌  Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
