import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    xp: 6540,
    level: 12,
    rank: 4,
    streak: 7,
    longestStreak: 14,
    careerReadiness: 78,
    resumeScore: 73,
    badges: ['🏆 First Solve', '🔥 7-Day Streak', '⚡ Speed Demon', '🎯 Bullseye'],
    tasks: [
      { id: 1, text: 'Solve 2 LeetCode problems', done: true },
      { id: 2, text: 'Complete System Design module', done: true },
      { id: 3, text: 'Practice mock interview (30 min)', done: false },
      { id: 4, text: 'Review SQL joins chapter', done: false },
      { id: 5, text: 'Watch backend architecture video', done: false },
    ],
    solvedProblems: ['1', '2', '4'],
    bookmarkedProblems: ['3', '6'],
    courseProgress: {
      '1': 68, '2': 34, '3': 12, '4': 85, '5': 51, '6': 0,
    },
    weeklyStats: {
      problemsSolved: 14,
      hoursStudied: 18.5,
      xpEarned: 1240,
      rankChange: 23,
    },
  },
  reducers: {
    toggleTask(state, action) {
      const task = state.tasks.find(t => t.id === action.payload)
      if (task) {
        task.done = !task.done
        if (task.done) state.xp += 50
      }
    },
    addTask(state, action) {
      state.tasks.push({ id: Date.now(), text: action.payload, done: false })
    },
    addXp(state, action) {
      state.xp += action.payload
      state.level = Math.floor(state.xp / 1000) + 1
    },
    bookmarkProblem(state, action) {
      const id = String(action.payload)
      if (state.bookmarkedProblems.includes(id)) {
        state.bookmarkedProblems = state.bookmarkedProblems.filter(p => p !== id)
      } else {
        state.bookmarkedProblems.push(id)
      }
    },
    markProblemSolved(state, action) {
      const id = String(action.payload)
      if (!state.solvedProblems.includes(id)) {
        state.solvedProblems.push(id)
      }
    },
    updateCourseProgress(state, action) {
      const { courseId, progress } = action.payload
      state.courseProgress[courseId] = progress
    },
  },
})

export const {
  toggleTask, addTask, addXp, bookmarkProblem, markProblemSolved, updateCourseProgress,
} = userSlice.actions
export default userSlice.reducer
