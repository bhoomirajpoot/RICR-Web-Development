import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import { useTheme } from '../hooks/useTheme'
import { interviewQuestions } from '../assets/data/mockData'

const AI_RESPONSES = [
  "Great answer! You demonstrated strong self-awareness. Now let's dive deeper — explain the difference between process and thread, and when you'd use each.",
  "Good structure using STAR method! One suggestion: quantify your impact with numbers. Now, design a URL shortener like bit.ly. Walk me through your approach.",
  "Excellent system design thinking! How would you handle 1 million requests per second? Think about caching, load balancing, and database sharding.",
  "Perfect! You've shown solid technical depth. Final question: Tell me about a time you disagreed with a team member and how you handled it.",
  "Wonderful! You've completed the mock interview. Your overall score is 84/100. Generating detailed feedback...",
]

export default function InterviewPage() {
  const { colors } = useTheme()
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your ACIE AI Interviewer. I'll be conducting a 30-minute mock technical interview today. Let's start: Tell me about yourself and your journey into software engineering.", time: '0:00' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [score, setScore] = useState(84)
  const [aiIdx, setAiIdx] = useState(0)
  const [tab, setTab] = useState('interview')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const formatTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const send = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input, time: '1:23' }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const aiResponse = AI_RESPONSES[aiIdx % AI_RESPONSES.length]
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse, time: '1:45' }])
      setAiIdx(i => i + 1)
      setTyping(false)
    }, 2000 + Math.random() * 1000)
  }

  const BREAKDOWN = [
    { label: 'Communication', value: 88, color: '#6366f1' },
    { label: 'Technical Depth', value: 75, color: '#22d3ee' },
    { label: 'Problem Solving', value: 82, color: '#4ade80' },
    { label: 'Confidence', value: 70, color: '#facc15' },
    { label: 'STAR Method', value: 90, color: '#f472b6' },
  ]

  return (
    <div style={{ color: colors.text }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Interview Simulation</h1>
          <p style={{ fontSize: 14, opacity: 0.45, margin: '4px 0 0' }}>AI-powered mock interview with real-time feedback</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ background: 'rgba(244,114,182,0.12)', border: '1px solid rgba(244,114,182,0.3)', borderRadius: 10, padding: '8px 16px', fontSize: 14, color: '#f472b6', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
            ⏱ {formatTime(timeLeft)}
          </div>
          <div style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 10, padding: '8px 16px', fontSize: 14, color: '#4ade80', fontWeight: 700 }}>
            Score: {score}/100
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {['interview', 'feedback', 'tips'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '8px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700, textTransform: 'capitalize',
              background: tab === t ? 'linear-gradient(135deg, #6366f1, #22d3ee)' : 'rgba(255,255,255,0.06)',
              color: tab === t ? '#fff' : colors.textMuted }}>
            {t === 'interview' ? '💬 Interview' : t === 'feedback' ? '📊 Feedback' : '💡 Tips'}
          </button>
        ))}
      </div>

      {tab === 'interview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
          {/* Chat */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <GlassCard style={{ height: 460, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                  {msg.role === 'ai' && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}
                      style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                      🤖
                    </motion.div>
                  )}
                  {msg.role === 'user' && (
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #f472b6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, flexShrink: 0 }}>
                      A
                    </div>
                  )}
                  <div style={{ maxWidth: '72%' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: msg.role === 'ai' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                      background: msg.role === 'ai' ? 'rgba(99,102,241,0.15)' : 'rgba(34,211,238,0.12)',
                      border: `1px solid ${msg.role === 'ai' ? 'rgba(99,102,241,0.2)' : 'rgba(34,211,238,0.2)'}`,
                      fontSize: 14, lineHeight: 1.65, color: colors.text,
                    }}>
                      {msg.text}
                    </div>
                    <div style={{ fontSize: 10, opacity: 0.3, marginTop: 4, textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</div>
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
                  <div style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '4px 16px 16px 16px', padding: '14px 18px', display: 'flex', gap: 5 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.18 }}
                        style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </GlassCard>

            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Type your answer (Press Enter to send)..."
                style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '14px 18px', color: colors.text, fontSize: 14, outline: 'none', fontFamily: 'Syne, sans-serif' }}
              />
              <Button variant="primary" onClick={send} disabled={!input.trim() || typing}>→</Button>
            </div>
          </div>

          {/* Score sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <GlassCard>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Live Score</div>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 52, fontWeight: 900, color: '#4ade80' }}>{score}</div>
                <div style={{ fontSize: 12, opacity: 0.45 }}>out of 100</div>
              </div>
              {BREAKDOWN.map(b => (
                <div key={b.label} style={{ marginBottom: 10 }}>
                  <ProgressBar value={b.value} color={b.color} height={4} showLabel label={b.label} />
                </div>
              ))}
            </GlassCard>

            <GlassCard>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Question Types</div>
              {[['Technical', '#6366f1'], ['HR/Behavioral', '#f472b6'], ['System Design', '#22d3ee']].map(([l, c]) => (
                <Badge key={l} text={l} color={c} size="md" className="" style={{ display: 'block', marginBottom: 8 }} />
              ))}
            </GlassCard>
          </div>
        </div>
      )}

      {tab === 'feedback' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <GlassCard>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Detailed Breakdown</div>
            {BREAKDOWN.map(b => (
              <div key={b.label} style={{ marginBottom: 16 }}>
                <ProgressBar value={b.value} color={b.color} height={7} showLabel label={b.label} />
              </div>
            ))}
          </GlassCard>
          <GlassCard>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>AI Feedback</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { type: '✅', text: 'Good use of STAR method in behavioral answers', color: '#4ade80' },
                { type: '✅', text: 'Clear communication and logical structure', color: '#4ade80' },
                { type: '✅', text: 'Solid understanding of data structures', color: '#4ade80' },
                { type: '⚠️', text: 'Add more technical depth with metrics', color: '#facc15' },
                { type: '⚠️', text: 'Quantify your past achievements', color: '#facc15' },
                { type: '❌', text: 'System design answer lacked scalability focus', color: '#f87171' },
              ].map((f, i) => (
                <div key={i} style={{ fontSize: 13, color: colors.text, opacity: 0.8, display: 'flex', gap: 8, padding: '8px 12px', background: f.color + '12', borderRadius: 8 }}>
                  <span>{f.type}</span> {f.text}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {tab === 'tips' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
          {[
            { title: '🎯 STAR Method', tips: ['Situation: Set the context', 'Task: Describe your role', 'Action: Explain steps taken', 'Result: Share the outcome'] },
            { title: '💡 Technical Answers', tips: ['Think out loud always', 'Start with brute force', 'Optimize step by step', 'Discuss trade-offs'] },
            { title: '🤝 Behavioral', tips: ['Use real examples', 'Show leadership moments', 'Quantify achievements', 'End with positive outcome'] },
          ].map(section => (
            <GlassCard key={section.title}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{section.title}</div>
              {section.tips.map((tip, i) => (
                <div key={i} style={{ fontSize: 13, opacity: 0.7, marginBottom: 10, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#6366f1', flexShrink: 0 }}>{i + 1}.</span> {tip}
                </div>
              ))}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
