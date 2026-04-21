import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { togglePomodoro } from '../../store/slices/uiSlice'
import { usePomodoro } from '../../hooks/usePomodoro'

const PomodoroWidget = () => {
  const dispatch = useDispatch()
  const { showPomodoro } = useSelector(state => state.ui)
  const { time, active, formatted, toggle, reset } = usePomodoro()

  const progress = ((25 * 60 - time) / (25 * 60)) * 100
  const r = 28
  const circ = 2 * Math.PI * r
  const offset = circ - (progress / 100) * circ

  return (
    <AnimatePresence>
      {showPomodoro && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 100 }}
          drag
          dragMomentum={false}
          style={{
            position: 'fixed', bottom: 80, right: 24, zIndex: 500,
            background: 'rgba(8,8,20,0.97)',
            border: '1px solid rgba(244,114,182,0.4)',
            borderRadius: 20, padding: 20, width: 220,
            backdropFilter: 'blur(20px)', cursor: 'grab',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f472b6' }}>⏱ Focus Timer</div>
            <button onClick={() => dispatch(togglePomodoro())}
              style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 16 }}>×</button>
          </div>

          {/* Circular timer */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <div style={{ position: 'relative', width: 72, height: 72 }}>
              <svg width={72} height={72} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={36} cy={36} r={r} fill="none" stroke="rgba(244,114,182,0.15)" strokeWidth={5} />
                <motion.circle
                  cx={36} cy={36} r={r} fill="none"
                  stroke="#f472b6" strokeWidth={5} strokeLinecap="round"
                  strokeDasharray={circ}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 14, fontWeight: 900, color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}>
                  {formatted}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={toggle}
              style={{
                flex: 1,
                background: active ? 'rgba(244,114,182,0.2)' : 'linear-gradient(135deg, #f472b6, #fb923c)',
                border: active ? '1px solid rgba(244,114,182,0.4)' : 'none',
                borderRadius: 10, padding: '9px',
                color: '#fff', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Syne, sans-serif', fontSize: 13,
              }}
            >
              {active ? '⏸ Pause' : '▶ Start'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={reset}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '9px 14px',
                color: '#6b7280', cursor: 'pointer', fontSize: 16,
              }}
            >
              ↺
            </motion.button>
          </div>

          <div style={{ marginTop: 10, fontSize: 11, opacity: 0.4, textAlign: 'center', color: '#fff' }}>
            {active ? '🔴 Focus session in progress' : '25 min focus session'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PomodoroWidget
