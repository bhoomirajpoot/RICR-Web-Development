import { motion } from 'framer-motion'
import GlassCard from '../components/ui/GlassCard'
import CircularProgress from '../components/ui/CircularProgress'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { useTheme } from '../hooks/useTheme'
import { useUser } from '../hooks/useUser'
import { useSelector } from 'react-redux'

export default function ProfilePage() {
  const { colors } = useTheme()
  const { user } = useSelector(state => state.auth)
  const { xp, level, streak, rank, badges, solvedProblems, careerReadiness } = useUser()

  const xpToNext = (level + 1) * 1000
  const xpProgress = (xp % 1000) / 10

  return (
    <div style={{ color: colors.text }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 28 }}>Profile</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
        {/* Left: avatar + stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <GlassCard style={{ textAlign: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: 90, height: 90, borderRadius: '50%', margin: '0 auto 16px',
                background: 'linear-gradient(135deg, #6366f1, #f472b6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 32, color: '#fff',
                boxShadow: '0 0 40px rgba(99,102,241,0.4)',
              }}>
              {user?.name?.charAt(0) || 'A'}
            </motion.div>
            <div style={{ fontSize: 22, fontWeight: 900 }}>{user?.name || 'Arjun Sharma'}</div>
            <div style={{ fontSize: 13, opacity: 0.45, marginTop: 4 }}>{user?.email}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
              <Badge text="Pro Member" color="#6366f1" size="md" />
              <Badge text={`Rank #${rank}`} color="#facc15" size="md" />
            </div>

            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ opacity: 0.5 }}>Level {level}</span>
                <span style={{ color: '#6366f1', fontWeight: 700 }}>Level {level + 1}</span>
              </div>
              <ProgressBar value={xpProgress} />
              <div style={{ fontSize: 11, opacity: 0.35, marginTop: 4 }}>{xp.toLocaleString()} / {xpToNext.toLocaleString()} XP</div>
            </div>
          </GlassCard>

          <GlassCard>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Quick Stats</div>
            {[
              { label: 'Problems Solved', value: solvedProblems.length, icon: '💻', color: '#6366f1' },
              { label: 'Day Streak', value: streak + ' 🔥', icon: '🔥', color: '#facc15' },
              { label: 'Total XP', value: xp.toLocaleString(), icon: '⚡', color: '#22d3ee' },
              { label: 'Career Readiness', value: careerReadiness + '%', icon: '📊', color: '#4ade80' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: 13, opacity: 0.6 }}>{s.icon} {s.label}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </GlassCard>

          <Button variant="secondary" fullWidth>Edit Profile</Button>
        </div>

        {/* Right: details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <GlassCard>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Career Readiness</div>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
              <CircularProgress value={careerReadiness} size={110} color="#6366f1" label="Overall" />
              <div style={{ flex: 1 }}>
                {[
                  ['Resume', 73, '#22d3ee'],
                  ['Technical', 72, '#f472b6'],
                  ['Behavioral', 80, '#4ade80'],
                  ['Consistency', 90, '#facc15'],
                ].map(([l, v, c]) => (
                  <ProgressBar key={l} value={v} color={c} height={6} showLabel label={l} className="" style={{ marginBottom: 12 }} />
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Achievement Badges</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {badges.map((badge, i) => (
                <motion.div key={i} whileHover={{ scale: 1.1 }}
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 12, padding: '12px 8px', textAlign: 'center', cursor: 'default' }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{badge.split(' ')[0]}</div>
                  <div style={{ fontSize: 10, opacity: 0.6 }}>{badge.split(' ').slice(1).join(' ')}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Learning Goals</div>
            {[
              { goal: 'Get placed at a top tech company', target: 'Q2 2026', progress: 68 },
              { goal: 'Complete 200 LeetCode problems', target: 'March 2026', progress: 45 },
              { goal: 'Master System Design', target: 'April 2026', progress: 30 },
            ].map(g => (
              <div key={g.goal} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ opacity: 0.8 }}>{g.goal}</span>
                  <span style={{ opacity: 0.4, fontSize: 12 }}>{g.target}</span>
                </div>
                <ProgressBar value={g.progress} />
                <div style={{ fontSize: 11, opacity: 0.35, marginTop: 4 }}>{g.progress}% complete</div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
