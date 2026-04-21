import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const ThemeToggle = () => {
  const { mode, isDark, toggle } = useTheme()

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      title="Toggle theme"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: '6px 14px',
        color: isDark ? '#6b7280' : '#374151',
        cursor: 'pointer',
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'Syne, sans-serif',
        fontWeight: 600,
      }}
    >
      <motion.span
        key={mode}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.span>
      <span style={{ fontSize: 13 }}>{isDark ? 'Dark' : 'Light'}</span>
    </motion.button>
  )
}

export default ThemeToggle
