/**
 * Format a number with K/M suffix
 */
export const formatNumber = (n) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

/**
 * Format seconds to MM:SS
 */
export const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

/**
 * Get difficulty color
 */
export const getDifficultyColor = (diff) => ({
  Easy: '#4ade80',
  Medium: '#facc15',
  Hard: '#f87171',
}[diff] || '#6b7280')

/**
 * Get XP needed for a given level
 */
export const xpForLevel = (level) => level * 1000

/**
 * Calculate progress percentage
 */
export const calcPercent = (current, total) => Math.min(100, Math.round((current / total) * 100))

/**
 * Truncate text with ellipsis
 */
export const truncate = (str, n = 60) => str.length > n ? str.slice(0, n) + '...' : str

/**
 * Get random item from array
 */
export const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

/**
 * Generate heatmap grid data
 */
export const generateHeatmap = (weeks = 12, days = 7) =>
  Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => ({
      week: w, day: d, value: Math.floor(Math.random() * 4),
    }))
  )

/**
 * Debounce function
 */
export const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
