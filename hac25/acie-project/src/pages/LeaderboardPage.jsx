import { motion } from 'framer-motion'
import GlassCard from '../components/ui/GlassCard'
import ProgressBar from '../components/ui/ProgressBar'
import { useTheme } from '../hooks/useTheme'
import { leaderboard } from '../assets/data/mockData'

export default function LeaderboardPage() {
  const { colors } = useTheme()
  const top3 = leaderboard.slice(0, 3)
  const rest = leaderboard.slice(3)

  const MEDAL_COLORS = { 1: '#facc15', 2: '#9ca3af', 3: '#b45309' }

  return (
    <div style={{ color: colors.text }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Leaderboard</h1>
        <p style={{ fontSize: 14, opacity: 0.45, margin: '4px 0 0' }}>Global rankings updated every hour</p>
      </div>

      {/* Podium */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'flex-end', marginBottom: 32 }}>
        {/* 2nd */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ flex: '1', maxWidth: 240 }}>
          <GlassCard style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🥈</div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{top3[1].name}</div>
            <div style={{ fontSize: 12, opacity: 0.45, marginTop: 2 }}>Lv.{top3[1].level}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#9ca3af', marginTop: 8 }}>{top3[1].xp.toLocaleString()}</div>
            <div style={{ fontSize: 11, opacity: 0.4 }}>XP Points</div>
            <div style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>{top3[1].college}</div>
          </GlassCard>
        </motion.div>

        {/* 1st - elevated */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ flex: '1', maxWidth: 280 }}>
          <GlassCard gradient="linear-gradient(135deg, rgba(250,204,21,0.12), rgba(251,146,60,0.08))"
            style={{ padding: 24, textAlign: 'center', border: '1px solid rgba(250,204,21,0.4)' }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} style={{ fontSize: 50, marginBottom: 8 }}>🏆</motion.div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#facc15', letterSpacing: 2, marginBottom: 4 }}>CHAMPION</div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>{top3[0].name}</div>
            <div style={{ fontSize: 12, opacity: 0.45, marginTop: 2 }}>Lv.{top3[0].level} · {top3[0].streak} day streak 🔥</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#facc15', marginTop: 10 }}>{top3[0].xp.toLocaleString()}</div>
            <div style={{ fontSize: 11, opacity: 0.4 }}>XP Points</div>
            <div style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>{top3[0].college}</div>
          </GlassCard>
        </motion.div>

        {/* 3rd */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ flex: '1', maxWidth: 240 }}>
          <GlassCard style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🥉</div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{top3[2].name}</div>
            <div style={{ fontSize: 12, opacity: 0.45, marginTop: 2 }}>Lv.{top3[2].level}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#b45309', marginTop: 8 }}>{top3[2].xp.toLocaleString()}</div>
            <div style={{ fontSize: 11, opacity: 0.4 }}>XP Points</div>
            <div style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>{top3[2].college}</div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Full rankings table */}
      <GlassCard>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Full Rankings</div>
        {leaderboard.map((user, i) => (
          <motion.div key={user.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 12px',
              borderBottom: i < leaderboard.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              borderRadius: 10,
              background: user.isYou ? 'linear-gradient(90deg, rgba(99,102,241,0.1), transparent)' : 'transparent',
            }}>
            <div style={{ width: 30, fontSize: 14, fontWeight: 700, color: MEDAL_COLORS[user.rank] || colors.textMuted }}>
              #{user.rank}
            </div>
            <div style={{ fontSize: 22 }}>{user.badge}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: user.isYou ? 800 : 600, color: user.isYou ? '#a5b4fc' : colors.text }}>
                {user.name}
              </div>
              <div style={{ fontSize: 11, opacity: 0.4, marginTop: 1 }}>{user.college} · Lv.{user.level}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: MEDAL_COLORS[user.rank] || '#facc15' }}>
                {user.xp.toLocaleString()}
              </div>
              <div style={{ fontSize: 10, opacity: 0.4 }}>XP</div>
            </div>
            <div style={{ width: 80 }}>
              <ProgressBar value={Math.round((user.xp / 10000) * 100)} color={MEDAL_COLORS[user.rank] || '#6366f1'} height={4} />
            </div>
            <div style={{ fontSize: 13, opacity: 0.5, minWidth: 60, textAlign: 'right' }}>
              🔥 {user.streak}d
            </div>
          </motion.div>
        ))}
      </GlassCard>
    </div>
  )
}
