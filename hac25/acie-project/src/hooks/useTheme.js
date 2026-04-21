import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../store/slices/themeSlice'

export const useTheme = () => {
  const dispatch = useDispatch()
  const { mode } = useSelector(state => state.theme)
  const isDark = mode === 'dark'

  const colors = {
    bg: isDark ? '#060810' : '#f0f2f8',
    surface: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)',
    surfaceHover: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.95)',
    border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    text: isDark ? '#e8eaf0' : '#0f1117',
    textMuted: isDark ? '#6b7280' : '#9ca3af',
    glass: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)',
    accent: '#6366f1',
    accentCyan: '#22d3ee',
    accentPink: '#f472b6',
    accentGreen: '#4ade80',
    accentYellow: '#facc15',
    accentOrange: '#fb923c',
  }

  const toggle = () => dispatch(toggleTheme())

  return { mode, isDark, colors, toggle }
}
