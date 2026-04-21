import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarCollapsed: false,
    showPomodoro: false,
    pomodoroTime: 25 * 60,
    pomodoroActive: false,
    showNotifications: false,
    showAchievement: null,
    focusMode: false,
  },
  reducers: {
    toggleSidebar(state) { state.sidebarCollapsed = !state.sidebarCollapsed },
    setSidebarCollapsed(state, action) { state.sidebarCollapsed = action.payload },
    togglePomodoro(state) { state.showPomodoro = !state.showPomodoro },
    setPomodoroTime(state, action) { state.pomodoroTime = action.payload },
    tickPomodoro(state) {
      if (state.pomodoroTime > 0 && state.pomodoroActive) state.pomodoroTime -= 1
    },
    togglePomodoroActive(state) { state.pomodoroActive = !state.pomodoroActive },
    resetPomodoro(state) { state.pomodoroTime = 25 * 60; state.pomodoroActive = false },
    toggleNotifications(state) { state.showNotifications = !state.showNotifications },
    showAchievement(state, action) { state.showAchievement = action.payload },
    hideAchievement(state) { state.showAchievement = null },
    toggleFocusMode(state) { state.focusMode = !state.focusMode },
  },
})

export const {
  toggleSidebar, setSidebarCollapsed, togglePomodoro, setPomodoroTime,
  tickPomodoro, togglePomodoroActive, resetPomodoro, toggleNotifications,
  showAchievement, hideAchievement, toggleFocusMode,
} = uiSlice.actions
export default uiSlice.reducer
