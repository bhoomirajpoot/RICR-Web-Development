import { motion } from 'framer-motion'
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import { useTheme } from '../hooks/useTheme'
import { progressData, topicAccuracy, radarData, pieData } from '../assets/data/mockData'

const TOOLTIP_STYLE = {
  contentStyle: {
    background: 'rgba(10,10,30,0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    fontFamily: 'Syne, sans-serif',
    fontSize: 12,
  },
}

export default function AnalyticsPage() {
  const { colors } = useTheme()

  return (
    <div style={{ color: colors.text }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Performance Analytics</h1>
        <p style={{ fontSize: 14, opacity: 0.45, margin: '4px 0 0' }}>Track your learning progress over time</p>
      </div>

      {/* Charts grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <GlassCard>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Progress Over Time</div>
          <div style={{ fontSize: 12, opacity: 0.4, marginBottom: 16 }}>Career readiness score by month</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Syne' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Syne' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 5, strokeWidth: 2, stroke: '#060810' }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Topic Accuracy</div>
          <div style={{ fontSize: 12, opacity: 0.4, marginBottom: 16 }}>% correct answers per topic</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topicAccuracy} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="topic" tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'Syne' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12, fontFamily: 'Syne' }} axisLine={false} tickLine={false} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}
                fill="url(#barGrad)"
              />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#22d3ee88" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Skill Coverage Radar</div>
          <div style={{ fontSize: 12, opacity: 0.4, marginBottom: 16 }}>Multi-dimensional skill assessment</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'Syne' }} />
              <Radar name="Skills" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip {...TOOLTIP_STYLE} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Mistake Distribution</div>
          <div style={{ fontSize: 12, opacity: 0.4, marginBottom: 16 }}>Types of errors made in practice</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <ResponsiveContainer width="60%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={75} innerRadius={40} dataKey="value" paddingAngle={3}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip {...TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {pieData.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, color: colors.text }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: d.color, fontWeight: 700 }}>{d.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Monthly Test */}
      <GlassCard gradient="linear-gradient(135deg, rgba(99,102,241,0.12), rgba(34,211,238,0.06))" hover={false}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>📅 Monthly Grand Mock Test — March 2026</div>
            <div style={{ fontSize: 13, opacity: 0.5, marginTop: 4 }}>120 minutes · 100 questions · Full syllabus coverage</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <span style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, padding: '4px 12px', fontSize: 12, color: '#a5b4fc' }}>DSA</span>
              <span style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: 8, padding: '4px 12px', fontSize: 12, color: '#67e8f9' }}>System Design</span>
              <span style={{ background: 'rgba(244,114,182,0.15)', border: '1px solid rgba(244,114,182,0.3)', borderRadius: 8, padding: '4px 12px', fontSize: 12, color: '#f9a8d4' }}>SQL</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#6366f1', fontFamily: 'JetBrains Mono, monospace' }}>06d 14h</div>
              <div style={{ fontSize: 11, opacity: 0.4, marginTop: 2 }}>Time Remaining</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="primary" onClick={() => {}}>Attempt Test →</Button>
              <Button variant="ghost" size="sm">Download Past Report</Button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Locked premium test */}
      <GlassCard style={{ marginTop: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ filter: 'blur(3px)', opacity: 0.5, pointerEvents: 'none' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>🔒 Elite Mock Series — Company-Specific Tests</div>
          <div style={{ fontSize: 13, opacity: 0.5, marginTop: 4 }}>Google, Amazon, Microsoft specific test patterns</div>
        </div>
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(6,8,16,0.7)', backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔒</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#e8eaf0', marginBottom: 12 }}>Elite Feature — Upgrade to unlock</div>
          <Button variant="primary" size="sm">Upgrade to Elite ↗</Button>
        </motion.div>
      </GlassCard>
    </div>
  )
}
