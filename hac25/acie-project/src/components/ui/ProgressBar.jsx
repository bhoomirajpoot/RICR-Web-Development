import { motion } from 'framer-motion'

const ProgressBar = ({
  value,
  color = '#6366f1',
  height = 6,
  showLabel = false,
  label,
  animated = true,
  gradient = null,
  className = '',
}) => {
  return (
    <div className={className}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
          <span style={{ opacity: 0.6 }}>{label}</span>
          <span style={{ color, fontWeight: 700 }}>{value}%</span>
        </div>
      )}
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 99,
        height,
        overflow: 'hidden',
      }}>
        {animated ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: gradient || `linear-gradient(90deg, ${color}, ${color}bb)`,
              borderRadius: 99,
            }}
          />
        ) : (
          <div style={{
            width: `${value}%`, height: '100%',
            background: gradient || `linear-gradient(90deg, ${color}, ${color}bb)`,
            borderRadius: 99,
          }} />
        )}
      </div>
    </div>
  )
}

export default ProgressBar
