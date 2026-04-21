import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import CareerReadinessCard from '../components/dashboard/CareerReadinessCard'
import StreakCard from '../components/dashboard/StreakCard'
import StudyPlanCard from '../components/dashboard/StudyPlanCard'
import TopicHeatmap from '../components/dashboard/TopicHeatmap'
import WeeklySummaryCard from '../components/dashboard/WeeklySummaryCard'
import GamificationBadges from '../components/gamification/GamificationBadges'
import GlassCard from '../components/ui/GlassCard'
import CircularProgress from '../components/ui/CircularProgress'
import ProgressBar from '../components/ui/ProgressBar'
import { useTheme } from '../hooks/useTheme'
import { useUser } from '../hooks/useUser'
import { motivationalQuotes } from '../assets/data/mockData'

const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

export default function DashboardPage() {
  const { colors } = useTheme()
  const { streak, resumeScore, rank } = useUser()

  return (
    <div style={{ color: colors.text }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Dashboard</h1>
          <p style={{ fontSize: 14, opacity: 0.45, margin: '4px 0 0' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 12, padding: '10px 18px', fontSize: 13, color: '#4ade80', fontWeight: 700 }}>
          📈 You're ahead of 72% of users
        </div>
      </motion.div>

      {/* Row 1: Career Readiness, Resume Score, Streak */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
        <CareerReadinessCard score={78} />

        {/* Resume Score */}
        <GlassCard>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Resume Strength</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <CircularProgress value={resumeScore} size={90} color="#22d3ee" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, marginBottom: 10 }}>SUGGESTIONS</div>
              {['Add projects section', 'Quantify achievements', 'Add LinkedIn URL', 'Improve skills section'].map((s, i) => (
                <div key={i} style={{ fontSize: 12, opacity: 0.65, marginBottom: 7, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#fb923c', fontSize: 8 }}>●</span> {s}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <StreakCard streak={streak} />
      </div>

      {/* Row 2: Heatmap + Study Plan */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        <TopicHeatmap />
        <StudyPlanCard />
      </div>

      {/* Row 3: Weekly Summary + Badges + Quote */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 20 }}>
        <WeeklySummaryCard />
        <GamificationBadges />
      </div>

      {/* Row 4: Quote + Rank */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <GlassCard gradient="linear-gradient(135deg, rgba(99,102,241,0.1), rgba(34,211,238,0.05))">
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.4, letterSpacing: 1, marginBottom: 10 }}>✨ DAILY MOTIVATION</div>
          <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.5, fontStyle: 'italic', opacity: 0.9 }}>
            "{quote}"
          </div>
        </GlassCard>

        <GlassCard>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Global Rank</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 52, fontWeight: 900, background: 'linear-gradient(135deg, #facc15, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              #{rank}
            </div>
            <div style={{ fontSize: 13, opacity: 0.5, marginTop: 4 }}>out of 50,000+ learners</div>
            <div style={{ marginTop: 16 }}>
              <ProgressBar value={92} color="#facc15" height={6} />
              <div style={{ fontSize: 11, opacity: 0.4, marginTop: 6 }}>Top 8% globally</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
