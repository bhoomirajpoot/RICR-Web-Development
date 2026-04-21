import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: true, // set true for demo
    user: {
      id: 'user_001',
      name: 'Arjun Sharma',
      email: 'arjun@example.com',
      avatar: null,
      joinedAt: '2025-09-01',
    },
    token: 'demo_token',
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
