import { motion } from 'framer-motion'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  fullWidth = false,
  icon,
  className = '',
  style = {},
  type = 'button',
}) => {
  const sizes = {
    sm: { padding: '6px 14px', fontSize: 13 },
    md: { padding: '10px 20px', fontSize: 14 },
    lg: { padding: '14px 28px', fontSize: 16 },
  }
  const s = sizes[size]

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
      color: '#fff',
      border: 'none',
    },
    secondary: {
      background: 'rgba(255,255,255,0.06)',
      color: 'rgba(255,255,255,0.7)',
      border: '1px solid rgba(255,255,255,0.12)',
    },
    danger: {
      background: 'rgba(248,113,113,0.15)',
      color: '#f87171',
      border: '1px solid rgba(248,113,113,0.3)',
    },
    success: {
      background: 'rgba(74,222,128,0.15)',
      color: '#4ade80',
      border: '1px solid rgba(74,222,128,0.3)',
    },
    ghost: {
      background: 'transparent',
      color: 'rgba(255,255,255,0.5)',
      border: 'none',
    },
  }

  const v = variants[variant]

  return (
    <motion.button
      type={type}
      whileHover={!disabled ? { scale: 1.04 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...s,
        ...v,
        borderRadius: 10,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'Syne, sans-serif',
        transition: 'background 0.2s',
        ...style,
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  )
}

export default Button
