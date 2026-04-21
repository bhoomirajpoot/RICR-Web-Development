import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../../store/slices/uiSlice'
import { logout } from '../../store/slices/authSlice'
import { useTheme } from '../../hooks/useTheme'

const NAV_ITEMS = [
  { path: '/app/dashboard', icon: '⬡', label: 'Dashboard' },
  { path: '/app/coding', icon: '{ }', label: 'Coding' },
  { path: '/app/courses', icon: '◎', label: 'Courses' },
  { path: '/app/analytics', icon: '▦', label: 'Analytics' },
  { path: '/app/interview', icon: '◈', label: 'Interview AI' },
  { path: '/app/leaderboard', icon: '◆', label: 'Leaderboard' },
  { path: '/app/profile', icon: '○', label: 'Profile' },
]

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { colors, isDark } = useTheme()
  const { sidebarCollapsed } = useSelector(state => state.ui)
  const { user } = useSelector(state => state.auth)

  const isActive = (path) => location.pathname === path

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 68 : 220 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
        borderRight: `1px solid ${colors.border}`,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <div style={{
        padding: '20px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: `1px solid ${colors.border}`,
        cursor: 'pointer',
      }} onClick={() => navigate('/app/dashboard')}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
        }}>⚡</div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: -0.5, color: colors.text, whiteSpace: 'nowrap' }}>ACIE</div>
              <div style={{ fontSize: 10, opacity: 0.4, color: colors.text, whiteSpace: 'nowrap' }}>Career Intelligence</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV_ITEMS.map(item => {
          const active = isActive(item.path)
          return (
            <motion.button
              key={item.path}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(item.path)}
              title={sidebarCollapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '10px 12px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                background: active
                  ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,211,238,0.1))'
                  : 'transparent',
                color: active ? '#a5b4fc' : colors.textMuted,
                marginBottom: 4,
                fontFamily: 'Syne, sans-serif',
                transition: 'color 0.2s',
              }}
            >
              <span style={{ fontSize: 17, flexShrink: 0, fontFamily: 'monospace', fontWeight: 700 }}>
                {item.icon}
              </span>
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ fontSize: 14, fontWeight: active ? 700 : 600, whiteSpace: 'nowrap' }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && (
                <motion.div
                  layoutId="activeDot"
                  style={{
                    marginLeft: 'auto',
                    width: 6, height: 6,
                    borderRadius: '50%',
                    background: '#a5b4fc',
                    flexShrink: 0,
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: '12px 8px', borderTop: `1px solid ${colors.border}` }}>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', marginBottom: 8,
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #6366f1, #f472b6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 13, color: '#fff',
              }}>
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name || 'User'}
                </div>
                <div style={{ fontSize: 11, opacity: 0.4, color: colors.text }}>Level 12 · Pro</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <motion.button
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          onClick={() => dispatch(toggleSidebar())}
          style={{
            width: '100%', padding: '8px 12px', borderRadius: 10,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${colors.border}`,
            color: colors.textMuted,
            cursor: 'pointer', fontSize: 14,
            display: 'flex', alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            gap: 8,
          }}
        >
          <span style={{ transform: sidebarCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>→</span>
          {!sidebarCollapsed && <span style={{ fontSize: 12, fontFamily: 'Syne, sans-serif' }}>Collapse</span>}
        </motion.button>
      </div>
    </motion.aside>
  )
}

export default Sidebar
