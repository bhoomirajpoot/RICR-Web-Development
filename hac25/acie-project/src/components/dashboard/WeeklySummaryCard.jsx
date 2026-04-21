import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'
import { useUser } from '../../hooks/useUser'

const stats = [
  { label: 'Problems Solved', key: 'problemsSolved', color: '#6366f1', icon: '💻' },
  { label: 'Hours Studied', key: 'hoursStudied', color: '#22d3ee', icon: '📚' },
  { label: 'XP Earned', key: 'xpEarned', color: '#facc15', icon: '⚡', format: v => v.toLocaleString() },
  { label: 'Rank Change', key: 'rankChange', color: '#4ade80', icon: '📈', prefix: '+' },
]

const WeeklySummaryCard = () => {
  const { weeklyStats } = useUser()

  return (
    <GlassCard>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#e8eaf0' }}>
        📊 Weekly Summary
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {stats.map(({ label, key, color, icon, format, prefix }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 12, padding: '14px',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color }}>
              {prefix || ''}{format ? format(weeklyStats[key]) : weeklyStats[key]}
            </div>
            <div style={{ fontSize: 11, opacity: 0.45, color: '#e8eaf0', marginTop: 2 }}>{label}</div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

export default WeeklySummaryCard
