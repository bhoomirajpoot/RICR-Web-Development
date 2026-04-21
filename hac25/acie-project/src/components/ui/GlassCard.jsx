import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const GlassCard = ({
  children,
  className = '',
  style = {},
  onClick,
  hover = true,
  glow = false,
  glowColor = 'rgba(99,102,241,0.15)',
  padding = '20px',
  gradient = null,
}) => {
  const { isDark } = useTheme()

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? {
        y: -4,
        boxShadow: glow
          ? `0 20px 60px ${glowColor}, 0 0 0 1px rgba(255,255,255,0.1)`
          : '0 20px 60px rgba(0,0,0,0.3)',
      } : {}}
      transition={{ duration: 0.2 }}
      style={{
        background: gradient || (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)'),
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        borderRadius: 16,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
