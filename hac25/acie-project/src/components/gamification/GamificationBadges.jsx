import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'
import { useUser } from '../../hooks/useUser'

const ALL_BADGES = [
  { id: 'first_solve', icon: '🏆', label: 'First Solve', desc: 'Solved your first problem' },
  { id: 'streak_7', icon: '🔥', label: '7-Day Streak', desc: '7 consecutive days of practice' },
  { id: 'speed_demon', icon: '⚡', label: 'Speed Demon', desc: 'Solved a Hard problem in <5 min' },
  { id: 'bullseye', icon: '🎯', label: 'Bullseye', desc: 'Achieved 100% on a test' },
  { id: 'scholar', icon: '📚', label: 'Scholar', desc: 'Completed 3 courses', locked: true },
  { id: 'centurion', icon: '💯', label: 'Centurion', desc: 'Solved 100 problems', locked: true },
  { id: 'leetmaster', icon: '👑', label: 'Leet Master', desc: 'Solved 50 Hard problems', locked: true },
  { id: 'interview_ace', icon: '🎤', label: 'Interview Ace', desc: 'Scored 90+ on mock interview', locked: true },
]

const GamificationBadges = () => {
  const { xp, level, rank } = useUser()
  const xpToNextLevel = (level + 1) * 1000
  const xpProgress = ((xp % 1000) / 1000) * 100

  return (
    <GlassCard>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: '#e8eaf0' }}>🎮 Achievements</div>
      <div style={{ fontSize: 12, opacity: 0.5, color: '#e8eaf0', marginBottom: 16 }}>
        Level {level} · {xp.toLocaleString()} XP · Rank #{rank}
      </div>

      {/* Level bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
          <span style={{ opacity: 0.5, color: '#e8eaf0' }}>Level {level}</span>
          <span style={{ color: '#6366f1', fontWeight: 700 }}>Level {level + 1}</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #6366f1, #22d3ee)',
              borderRadius: 99,
            }}
          />
        </div>
        <div style={{ fontSize: 11, opacity: 0.4, marginTop: 4, color: '#e8eaf0' }}>
          {xpToNextLevel - (xp % 1000)} XP to next level
        </div>
      </div>

      {/* Badges grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {ALL_BADGES.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            title={`${badge.label}: ${badge.desc}`}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '10px 6px', borderRadius: 12, cursor: 'help',
              background: badge.locked ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.1)',
              border: badge.locked ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(99,102,241,0.25)',
              opacity: badge.locked ? 0.4 : 1,
              filter: badge.locked ? 'grayscale(1)' : 'none',
            }}
          >
            <span style={{ fontSize: 22 }}>{badge.icon}</span>
            <span style={{ fontSize: 9, color: '#e8eaf0', textAlign: 'center', lineHeight: 1.2 }}>
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

export default GamificationBadges
