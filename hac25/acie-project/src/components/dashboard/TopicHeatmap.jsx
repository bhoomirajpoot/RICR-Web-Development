import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'
import { heatmapWeeks } from '../../assets/data/mockData'

const HEAT_COLORS = [
  'rgba(255,255,255,0.05)',
  '#facc15',
  '#4ade80',
  '#22d3ee',
]

const HEAT_LABELS = ['No activity', 'Weak', 'Good', 'Strong']

const TopicHeatmap = () => {
  const [tooltip, setTooltip] = useState(null)

  return (
    <GlassCard>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#e8eaf0' }}>
        🗂 Topic Mastery Heatmap
      </div>

      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', position: 'relative' }}>
        {heatmapWeeks.flat().map((cell, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.6, zIndex: 10 }}
            onHoverStart={() => setTooltip({ cell, i })}
            onHoverEnd={() => setTooltip(null)}
            style={{
              width: 14, height: 14, borderRadius: 3,
              background: HEAT_COLORS[cell.value],
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>

      {tooltip && (
        <div style={{
          position: 'absolute', background: 'rgba(10,10,25,0.95)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
          padding: '6px 10px', fontSize: 11, pointerEvents: 'none',
          color: '#e8eaf0',
        }}>
          {tooltip.cell.date} — {HEAT_LABELS[tooltip.cell.value]}
        </div>
      )}

      <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
        {HEAT_COLORS.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, opacity: 0.6, color: '#e8eaf0' }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
            {HEAT_LABELS[i]}
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

export default TopicHeatmap
