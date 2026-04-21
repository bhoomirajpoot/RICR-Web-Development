import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import Sidebar from '../components/ui/Sidebar'
import TopBar from '../components/ui/TopBar'
import PomodoroWidget from '../components/ui/PomodoroWidget'
import FloatingChatbot from '../components/ui/FloatingChatbot'
import { useTheme } from '../hooks/useTheme'

export default function DashboardLayout() {
  const { colors, isDark } = useTheme()
  const { sidebarCollapsed } = useSelector(state => state.ui)
  const location = useLocation()
  const sidebarWidth = sidebarCollapsed ? 68 : 220

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', fontFamily: 'Syne, sans-serif' }}>
      {/* Ambient background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', right: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', left: '30%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <Sidebar />

      <main style={{
        marginLeft: sidebarWidth,
        flex: 1,
        padding: '20px 32px 80px',
        transition: 'margin-left 0.3s ease',
        overflowY: 'auto',
        maxHeight: '100vh',
        position: 'relative',
        zIndex: 1,
      }}>
        <TopBar />

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <PomodoroWidget />
      <FloatingChatbot sidebarWidth={sidebarWidth} />
    </div>
  )
}
