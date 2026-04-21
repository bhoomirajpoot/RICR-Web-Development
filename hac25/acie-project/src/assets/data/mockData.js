// ============================================================
// ACIE Platform — Central Mock Data
// ============================================================

export const progressData = [
  { month: 'Sep', score: 42, problems: 12, hours: 8 },
  { month: 'Oct', score: 58, problems: 28, hours: 18 },
  { month: 'Nov', score: 63, problems: 35, hours: 22 },
  { month: 'Dec', score: 71, problems: 42, hours: 28 },
  { month: 'Jan', score: 68, problems: 38, hours: 24 },
  { month: 'Feb', score: 84, problems: 56, hours: 35 },
]

export const topicAccuracy = [
  { topic: 'Arrays', accuracy: 88, solved: 34 },
  { topic: 'Trees', accuracy: 72, solved: 18 },
  { topic: 'DP', accuracy: 54, solved: 12 },
  { topic: 'Graphs', accuracy: 65, solved: 15 },
  { topic: 'SQL', accuracy: 91, solved: 28 },
  { topic: 'System', accuracy: 48, solved: 8 },
]

export const radarData = [
  { subject: 'DSA', A: 75 },
  { subject: 'System Design', A: 55 },
  { subject: 'Behavioral', A: 80 },
  { subject: 'SQL', A: 88 },
  { subject: 'Frontend', A: 70 },
  { subject: 'Backend', A: 62 },
]

export const pieData = [
  { name: 'Logic Errors', value: 35, color: '#f472b6' },
  { name: 'Timeout', value: 22, color: '#fb923c' },
  { name: 'Edge Cases', value: 28, color: '#facc15' },
  { name: 'Syntax', value: 15, color: '#4ade80' },
]

export const courses = [
  {
    id: '1', title: 'DSA Mastery', category: 'DSA',
    rating: 4.8, duration: '40h', difficulty: 'Advanced',
    instructor: 'Raj Patel', color: '#6366f1', emoji: '📊',
    description: 'Complete DSA from basics to advanced with 500+ problems.',
    lessons: 120, students: 18400,
  },
  {
    id: '2', title: 'MERN Stack Pro', category: 'MERN',
    rating: 4.7, duration: '60h', difficulty: 'Intermediate',
    instructor: 'Priya Singh', color: '#22d3ee', emoji: '💻',
    description: 'Build production-grade full-stack apps with MongoDB, Express, React & Node.',
    lessons: 180, students: 12300,
  },
  {
    id: '3', title: 'System Design', category: 'System',
    rating: 4.9, duration: '25h', difficulty: 'Advanced',
    instructor: 'Amit Kumar', color: '#f472b6', emoji: '🏗️',
    description: 'Learn to design scalable systems. HLD, LLD, case studies.',
    lessons: 75, students: 9800,
  },
  {
    id: '4', title: 'SQL & Databases', category: 'SQL',
    rating: 4.6, duration: '20h', difficulty: 'Beginner',
    instructor: 'Neha Verma', color: '#4ade80', emoji: '🗄️',
    description: 'Master SQL from SELECT to advanced window functions.',
    lessons: 60, students: 22100,
  },
  {
    id: '5', title: 'Interview Prep', category: 'Interview',
    rating: 4.8, duration: '35h', difficulty: 'Intermediate',
    instructor: 'Vikram Das', color: '#fb923c', emoji: '🎯',
    description: 'Crack any tech interview: HR, technical, system design rounds.',
    lessons: 100, students: 31200,
  },
  {
    id: '6', title: 'Aptitude & Logic', category: 'Aptitude',
    rating: 4.5, duration: '15h', difficulty: 'Beginner',
    instructor: 'Sonal Mehta', color: '#a78bfa', emoji: '🧮',
    description: 'Quant, logical reasoning and verbal ability for campus placements.',
    lessons: 45, students: 14500,
  },
]

export const problems = [
  {
    id: '1', title: 'Two Sum', difficulty: 'Easy',
    tags: ['Array', 'Hash Map'], xp: 50,
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
    timeHint: 'O(n) using HashMap',
    spaceHint: 'O(n)',
    starterCode: {
      JavaScript: 'function twoSum(nums, target) {\n  // Your code here\n}',
      Python: 'def two_sum(nums, target):\n    # Your code here\n    pass',
      Java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}',
      'C++': 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}',
    },
  },
  {
    id: '2', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium',
    tags: ['Sliding Window', 'String', 'Hash Set'], xp: 100,
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3' },
      { input: 's = "bbbbb"', output: '1' },
    ],
    timeHint: 'O(n) using Sliding Window',
    spaceHint: 'O(min(m, n))',
    starterCode: {
      JavaScript: 'function lengthOfLongestSubstring(s) {\n  // Your code here\n}',
      Python: 'def length_of_longest_substring(s):\n    # Your code here\n    pass',
      Java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n    }\n}',
      'C++': 'int lengthOfLongestSubstring(string s) {\n    // Your code here\n}',
    },
  },
  {
    id: '3', title: 'Word Ladder', difficulty: 'Hard',
    tags: ['BFS', 'Graph', 'String'], xp: 200,
    description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList...',
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' },
    ],
    timeHint: 'O(M² × N) BFS',
    spaceHint: 'O(M² × N)',
    starterCode: {
      JavaScript: 'function ladderLength(beginWord, endWord, wordList) {\n  // Your code here\n}',
      Python: 'def ladder_length(beginWord, endWord, wordList):\n    # Your code here\n    pass',
      Java: 'class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        // Your code here\n    }\n}',
      'C++': 'int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n    // Your code here\n}',
    },
  },
  {
    id: '4', title: 'Binary Search', difficulty: 'Easy',
    tags: ['Binary Search', 'Array'], xp: 50,
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, return the index.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
    ],
    timeHint: 'O(log n)',
    spaceHint: 'O(1)',
    starterCode: {
      JavaScript: 'function search(nums, target) {\n  // Your code here\n}',
      Python: 'def search(nums, target):\n    # Your code here\n    pass',
      Java: 'class Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n    }\n}',
      'C++': 'int search(vector<int>& nums, int target) {\n    // Your code here\n}',
    },
  },
  {
    id: '5', title: 'Merge Intervals', difficulty: 'Medium',
    tags: ['Array', 'Sorting'], xp: 100,
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
    ],
    timeHint: 'O(n log n)',
    spaceHint: 'O(n)',
    starterCode: {
      JavaScript: 'function merge(intervals) {\n  // Your code here\n}',
      Python: 'def merge(intervals):\n    # Your code here\n    pass',
      Java: 'class Solution {\n    public int[][] merge(int[][] intervals) {\n        // Your code here\n    }\n}',
      'C++': 'vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    // Your code here\n}',
    },
  },
  {
    id: '6', title: 'Trapping Rain Water', difficulty: 'Hard',
    tags: ['Two Pointer', 'Dynamic Programming', 'Stack'], xp: 200,
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
    ],
    timeHint: 'O(n) using Two Pointers',
    spaceHint: 'O(1)',
    starterCode: {
      JavaScript: 'function trap(height) {\n  // Your code here\n}',
      Python: 'def trap(height):\n    # Your code here\n    pass',
      Java: 'class Solution {\n    public int trap(int[] height) {\n        // Your code here\n    }\n}',
      'C++': 'int trap(vector<int>& height) {\n    // Your code here\n}',
    },
  },
]

export const leaderboard = [
  { rank: 1, name: 'Aryan Gupta', xp: 9840, badge: '🏆', level: 18, streak: 21, college: 'IIT Bombay' },
  { rank: 2, name: 'Sneha Rao', xp: 8720, badge: '🥈', level: 16, streak: 14, college: 'NIT Trichy' },
  { rank: 3, name: 'Rahul Jain', xp: 7650, badge: '🥉', level: 15, streak: 10, college: 'BITS Pilani' },
  { rank: 4, name: 'Arjun Sharma (You)', xp: 6540, badge: '⚡', level: 12, streak: 7, college: 'VIT Vellore', isYou: true },
  { rank: 5, name: 'Priya Nair', xp: 5980, badge: '✨', level: 11, streak: 5, college: 'IIIT Hyderabad' },
  { rank: 6, name: 'Dev Patel', xp: 5200, badge: '🌟', level: 10, streak: 3, college: 'SRM Chennai' },
  { rank: 7, name: 'Ananya Singh', xp: 4890, badge: '💫', level: 9, streak: 8, college: 'Manipal' },
  { rank: 8, name: 'Karthik M', xp: 4230, badge: '🎯', level: 8, streak: 2, college: 'Pune University' },
]

export const notifications = [
  { id: 1, type: 'achievement', message: '🏆 New badge unlocked: 7-Day Streak!', time: '2 min ago', read: false },
  { id: 2, type: 'reminder', message: '⏰ Daily coding challenge is waiting for you.', time: '1 hour ago', read: false },
  { id: 3, type: 'course', message: '📚 New lesson added to DSA Mastery.', time: '3 hours ago', read: true },
  { id: 4, type: 'test', message: '📅 Monthly test starts in 6 days.', time: '1 day ago', read: true },
]

export const heatmapWeeks = Array.from({ length: 12 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => ({
    week: w,
    day: d,
    value: Math.floor(Math.random() * 4), // 0=none, 1=low, 2=medium, 3=high
    date: new Date(2025, 9, w * 7 + d + 1).toLocaleDateString(),
  }))
)

export const interviewQuestions = [
  {
    id: 1,
    question: "Tell me about yourself and your journey into software engineering.",
    category: "HR",
    followUp: "What's your biggest achievement so far?",
  },
  {
    id: 2,
    question: "Explain the difference between a process and a thread, and when you'd use each.",
    category: "Technical",
    followUp: "How does context switching work between threads?",
  },
  {
    id: 3,
    question: "Design a URL shortener like bit.ly. Walk me through your approach.",
    category: "System Design",
    followUp: "How would you handle 1 million requests per second?",
  },
  {
    id: 4,
    question: "Tell me about a time you disagreed with a team member and how you resolved it.",
    category: "Behavioral",
    followUp: "What would you do differently now?",
  },
]

export const motivationalQuotes = [
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. — Churchill",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Dream it. Wish it. Do it.",
  "Great things never come from comfort zones.",
  "Work hard in silence, let your success be the noise.",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
]
