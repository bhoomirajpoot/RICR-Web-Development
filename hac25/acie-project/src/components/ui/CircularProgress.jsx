import { motion } from 'framer-motion'

const CircularProgress = ({
  value,
  size = 120,
  stroke = 8,
  color = '#6366f1',
  trackColor = 'rgba(255,255,255,0.06)',
  label,
  sublabel,
  showValue = true,
  fontSize,
}) => {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  const valueFontSize = fontSize || size * 0.2

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={trackColor} strokeWidth={stroke}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      {/* Center content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {showValue && (
          <span style={{ fontSize: valueFontSize, fontWeight: 900, color, lineHeight: 1 }}>
            {value}%
          </span>
        )}
        {label && (
          <span style={{ fontSize: size * 0.09, opacity: 0.5, marginTop: 3, textAlign: 'center' }}>
            {label}
          </span>
        )}
        {sublabel && (
          <span style={{ fontSize: size * 0.08, opacity: 0.4, marginTop: 1, textAlign: 'center' }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
}

export default CircularProgress
