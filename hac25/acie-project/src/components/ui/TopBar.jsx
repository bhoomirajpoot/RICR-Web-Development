import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleNotifications } from '../../store/slices/uiSlice'
import { togglePomodoro } from '../../store/slices/uiSlice'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../../hooks/useTheme'
import { usePomodoro } from '../../hooks/usePomodoro'
import { notifications } from '../../assets/data/mockData'

const TopBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const { formatted, active } = usePomodoro()
  const { showNotifications } = useSelector(state => state.ui)
  const { user } = useSelector(state => state.auth)
  const { xp, level, streak } = useSelector(state => state.user)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      gap: 10, marginBottom: 12, position: 'relative',
    }}>
      {/* XP Badge */}
      <div style={{
        background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: 10, padding: '6px 14px', fontSize: 13, color: '#a5b4fc', fontWeight: 700,
      }}>
        ⚡ {xp.toLocaleString()} XP · Lv.{level}
      </div>

      {/* Streak */}
      <div style={{
        background: 'rgba(250,204,21,0.15)', border: '1px solid rgba(250,204,21,0.3)',
        borderRadius: 10, padding: '6px 14px', fontSize: 13, color: '#facc15', fontWeight: 700,
      }}>
        🔥 {streak} day streak
      </div>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Pomodoro */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => dispatch(togglePomodoro())}
        style={{
          background: active ? 'rgba(244,114,182,0.15)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${active ? 'rgba(244,114,182,0.4)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 10, padding: '6px 14px',
          color: active ? '#f472b6' : colors.textMuted,
          cursor: 'pointer', fontSize: 13, fontWeight: 700,
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        ⏱ {formatted}
      </motion.button>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(toggleNotifications())}
          style={{
            background: 'rgba(255,255,255,0.06)', border: `1px solid ${colors.border}`,
            borderRadius: 10, padding: '6px 12px', color: colors.textMuted,
            cursor: 'pointer', fontSize: 16, position: 'relative',
          }}
        >
          🔔
          {unreadCount > 0 && (
            <div style={{
              position: 'absolute', top: 4, right: 4, width: 8, height: 8,
              background: '#f472b6', borderRadius: '50%',
              border: `2px solid ${colors.bg}`,
            }} />
          )}
        </motion.button>

        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              style={{
                position: 'absolute', right: 0, top: '100%', marginTop: 8,
                width: 320, background: 'rgba(10,10,25,0.97)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
                padding: 12, backdropFilter: 'blur(20px)', zIndex: 500,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#e8eaf0', padding: '0 6px' }}>
                Notifications
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{
                  padding: '10px', borderRadius: 10, marginBottom: 4,
                  background: n.read ? 'transparent' : 'rgba(99,102,241,0.08)',
                  cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 13, color: '#e8eaf0', marginBottom: 3 }}>{n.message}</div>
                  <div style={{ fontSize: 11, opacity: 0.4 }}>{n.time}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('/app/profile')}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #f472b6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 14, color: '#fff', cursor: 'pointer',
        }}
      >
        {user?.name?.charAt(0) || 'A'}
      </motion.div>
    </div>
  )
}

export default TopBar
