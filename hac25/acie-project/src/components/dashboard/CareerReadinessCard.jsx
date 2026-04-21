import GlassCard from '../ui/GlassCard'
import CircularProgress from '../ui/CircularProgress'
import ProgressBar from '../ui/ProgressBar'

const breakdown = [
  { label: 'Resume', value: 85, color: '#6366f1' },
  { label: 'Mastery', value: 72, color: '#22d3ee' },
  { label: 'Interview', value: 68, color: '#f472b6' },
  { label: 'Consistency', value: 90, color: '#4ade80' },
]

const CareerReadinessCard = ({ score = 78 }) => {
  return (
    <GlassCard glow glowColor="rgba(99,102,241,0.2)">
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#e8eaf0' }}>
        Career Readiness
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <CircularProgress value={score} size={100} color="#6366f1" label="Score" />
        <div style={{ flex: 1 }}>
          {breakdown.map(({ label, value, color }) => (
            <div key={label} style={{ marginBottom: 10 }}>
              <ProgressBar value={value} color={color} height={5} showLabel label={label} />
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export default CareerReadinessCard
