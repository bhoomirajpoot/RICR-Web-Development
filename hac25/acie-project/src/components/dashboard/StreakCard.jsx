import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import GlassCard from '../ui/GlassCard'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const StreakCard = ({ streak = 7 }) => {
  const [showConfetti, setShowConfetti] = useState(false)
  const isMilestone = streak > 0 && streak % 7 === 0

  useEffect(() => {
    if (isMilestone) {
      setShowConfetti(true)
      const t = setTimeout(() => setShowConfetti(false), 4000)
      return () => clearTimeout(t)
    }
  }, [isMilestone])

  return (
    <GlassCard>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#6366f1', '#22d3ee', '#f472b6', '#4ade80', '#facc15']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}
        />
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <motion.span
          animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ fontSize: 32 }}
        >
          🔥
        </motion.span>
        <div>
          <div style={{ fontSize: 30, fontWeight: 900, color: '#facc15', lineHeight: 1 }}>{streak}</div>
          <div style={{ fontSize: 12, opacity: 0.5, color: '#e8eaf0' }}>Day Streak</div>
        </div>
        {isMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              marginLeft: 'auto',
              background: 'linear-gradient(135deg, #facc15, #fb923c)',
              borderRadius: 8, padding: '4px 10px',
              fontSize: 11, fontWeight: 700, color: '#000',
            }}
          >
            🎉 Milestone!
          </motion.div>
        )}
      </div>

      {/* Calendar week */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 12 }}>
        {DAYS.map((d, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, opacity: 0.4, marginBottom: 5, color: '#e8eaf0' }}>{d}</div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring' }}
              style={{
                width: '100%',
                paddingBottom: '100%',
                borderRadius: 6,
                background: i < streak
                  ? 'linear-gradient(135deg, #facc15, #fb923c)'
                  : 'rgba(255,255,255,0.06)',
                position: 'relative',
              }}
            >
              {i < streak && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9,
                }}>✓</div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, opacity: 0.5, color: '#e8eaf0' }}>
        {isMilestone
          ? '🎊 You\'re on fire! 7-day streak achieved!'
          : `${7 - (streak % 7)} days until next milestone`}
      </div>
    </GlassCard>
  )
}

export default StreakCard
