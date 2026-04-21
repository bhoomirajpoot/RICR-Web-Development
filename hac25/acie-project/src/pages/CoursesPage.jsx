import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import { useTheme } from '../hooks/useTheme'
import { useUser } from '../hooks/useUser'
import { courses } from '../assets/data/mockData'

const CATEGORIES = ['All', 'DSA', 'MERN', 'System', 'SQL', 'Interview', 'Aptitude']
const DIFF_COLORS = { Beginner: '#4ade80', Intermediate: '#facc15', Advanced: '#f87171' }

export default function CoursesPage() {
  const { colors } = useTheme()
  const { courseProgress, updateCourseProgress } = useUser()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = courses.filter(c =>
    (category === 'All' || c.category === category) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const inProgress = courses.filter(c => (courseProgress[c.id] || 0) > 0 && (courseProgress[c.id] || 0) < 100)

  return (
    <div style={{ color: colors.text }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Courses</h1>
          <p style={{ fontSize: 14, opacity: 0.45, margin: '4px 0 0' }}>{courses.length} courses available</p>
        </div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search courses..."
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 18px', color: colors.text, fontSize: 14, outline: 'none', width: 260, fontFamily: 'Syne, sans-serif' }}
        />
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {CATEGORIES.map(c => (
          <motion.button key={c} whileTap={{ scale: 0.95 }} onClick={() => setCategory(c)}
            style={{ padding: '7px 18px', borderRadius: 99, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'Syne, sans-serif',
              background: category === c ? 'linear-gradient(135deg, #6366f1, #22d3ee)' : 'rgba(255,255,255,0.06)',
              color: category === c ? '#fff' : colors.textMuted }}>
            {c}
          </motion.button>
        ))}
      </div>

      {/* Continue Learning */}
      {inProgress.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.4, letterSpacing: 1.5, marginBottom: 16 }}>CONTINUE LEARNING</div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {inProgress.map(c => {
              const progress = courseProgress[c.id] || 0
              return (
                <GlassCard key={c.id} style={{ minWidth: 280, padding: 18, flexShrink: 0 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: c.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{c.emoji}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{c.title}</div>
                      <div style={{ fontSize: 12, opacity: 0.45 }}>{progress}% complete</div>
                    </div>
                  </div>
                  <ProgressBar value={progress} color={c.color} height={5} />
                  <Button variant="ghost" size="sm" fullWidth style={{ marginTop: 12, color: c.color, border: `1px solid ${c.color}33`, background: c.color + '15' }}>
                    Continue →
                  </Button>
                </GlassCard>
              )
            })}
          </div>
        </div>
      )}

      {/* All Courses Grid */}
      <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.4, letterSpacing: 1.5, marginBottom: 20 }}>ALL COURSES</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {filtered.map((c, i) => {
          const progress = courseProgress[c.id] || 0
          return (
            <motion.div key={c.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}>
              <GlassCard glow glowColor={c.color + '20'} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: c.color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                    {c.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: colors.text }}>{c.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.45, marginTop: 2 }}>by {c.instructor}</div>
                  </div>
                </div>

                <p style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.6, marginBottom: 14, flex: 1 }}>{c.description}</p>

                <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                  <Badge text={c.difficulty} color={DIFF_COLORS[c.difficulty]} />
                  <Badge text={c.duration} color="#6b7280" />
                  <Badge text={`⭐ ${c.rating}`} color="#facc15" />
                  <Badge text={`${c.lessons} lessons`} color="#6b7280" />
                </div>

                {progress > 0 ? (
                  <div style={{ marginBottom: 14 }}>
                    <ProgressBar value={progress} color={c.color} height={5} />
                    <div style={{ fontSize: 11, opacity: 0.4, marginTop: 5 }}>{progress}% complete · {c.students.toLocaleString()} students</div>
                  </div>
                ) : (
                  <div style={{ fontSize: 12, opacity: 0.35, marginBottom: 14 }}>{c.students.toLocaleString()} enrolled</div>
                )}

                <Button
                  variant={progress > 0 ? 'ghost' : 'primary'} fullWidth
                  style={progress > 0 ? { color: c.color, border: `1px solid ${c.color}33`, background: c.color + '15' } : {}}
                  onClick={() => updateCourseProgress(c.id, Math.min(100, (progress || 0) + 5))}
                >
                  {progress === 0 ? 'Enroll Now' : progress === 100 ? '✓ Completed' : 'Continue →'}
                </Button>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
