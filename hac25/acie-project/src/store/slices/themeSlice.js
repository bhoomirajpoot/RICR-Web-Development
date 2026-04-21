import { createSlice } from '@reduxjs/toolkit'

const saved = typeof window !== 'undefined' ? localStorage.getItem('acie-theme') : 'dark'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: saved || 'dark',
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      if (typeof window !== 'undefined') {
        localStorage.setItem('acie-theme', state.mode)
        document.documentElement.classList.toggle('dark', state.mode === 'dark')
      }
    },
    setTheme(state, action) {
      state.mode = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('acie-theme', state.mode)
        document.documentElement.classList.toggle('dark', state.mode === 'dark')
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
