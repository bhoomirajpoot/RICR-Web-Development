import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FloatingChatbot = ({ sidebarWidth }) => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I\'m your ACIE AI assistant. Ask me anything about your learning journey! 🚀' }
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: 'Great question! Based on your progress, I suggest focusing on Dynamic Programming next — it\'s your weakest topic at 54%. Want me to create a 7-day DP study plan?'
      }])
    }, 1200)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: 'fixed', bottom: 86, left: sidebarWidth + 24, zIndex: 400,
              width: 320, height: 400,
              background: 'rgba(8,8,20,0.97)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: 20, overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              }}>🤖</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#e8eaf0' }}>ACIE AI Assistant</div>
                <div style={{ fontSize: 10, color: '#4ade80' }}>● Online</div>
              </div>
              <button onClick={() => setOpen(false)}
                style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%', padding: '8px 12px', borderRadius: msg.role === 'ai' ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
                    background: msg.role === 'ai' ? 'rgba(99,102,241,0.15)' : 'rgba(34,211,238,0.15)',
                    fontSize: 12, color: '#e8eaf0', lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 8 }}>
              <input
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask anything..."
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
                  padding: '8px 12px', color: '#e8eaf0', fontSize: 12, outline: 'none',
                }}
              />
              <button onClick={send}
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                  border: 'none', borderRadius: 10, padding: '8px 12px',
                  color: '#fff', cursor: 'pointer',
                }}>→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{
          position: 'fixed', bottom: 24, left: sidebarWidth + 24, zIndex: 400,
          background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
          border: 'none', borderRadius: '50%',
          width: 52, height: 52,
          fontSize: 22, cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(99,102,241,0.5)',
        }}
      >
        {open ? '✕' : '🤖'}
      </motion.button>
    </>
  )
}

export default FloatingChatbot
