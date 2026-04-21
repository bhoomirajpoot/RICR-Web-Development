const Badge = ({ text, color = '#6366f1', size = 'sm', className = '' }) => {
  const sizes = {
    xs: { fontSize: 10, padding: '1px 6px' },
    sm: { fontSize: 11, padding: '2px 8px' },
    md: { fontSize: 13, padding: '4px 12px' },
  }
  const s = sizes[size] || sizes.sm

  return (
    <span
      className={className}
      style={{
        background: color + '22',
        color,
        border: `1px solid ${color}44`,
        borderRadius: 6,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  )
}

export default Badge
