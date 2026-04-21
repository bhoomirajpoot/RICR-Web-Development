import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const FEATURES = [
  { icon: '🧠', title: 'AI Study Plans', desc: 'Adaptive roadmaps that evolve with your performance and target company.' },
  { icon: '⚡', title: 'Streak Engine', desc: 'Daily challenges and streak mechanics to keep you fiercely consistent.' },
  { icon: '💻', title: 'In-App Coding', desc: 'LeetCode-style Monaco editor with AI hints, test cases, and XP rewards.' },
  { icon: '🎯', title: 'Interview Sim', desc: 'AI mock interviews with real-time feedback and performance scoring.' },
  { icon: '📊', title: 'Deep Analytics', desc: 'Radar charts, heatmaps, skill gap analysis, and monthly reports.' },
  { icon: '🏆', title: 'Leaderboards', desc: 'Compete globally. Rise through ranks. Earn rare badges and titles.' },
]

const PRICING = [
  {
    plan: 'Free', price: '₹0', period: '', color: '#6b7280',
    features: ['50 Practice Problems', '3 Courses Access', 'Basic Analytics', 'Community Forum'],
    highlight: false,
  },
  {
    plan: 'Pro', price: '₹499', period: '/mo', color: '#6366f1',
    features: ['Unlimited Problems', 'All 30+ Courses', 'AI Interview Sim', 'Priority Support', 'Monthly Mock Tests'],
    highlight: true,
  },
  {
    plan: 'Elite', price: '₹999', period: '/mo', color: '#f472b6',
    features: ['Everything in Pro', '1:1 Expert Mentorship', 'Resume Review', 'LinkedIn Optimization', 'Placement Guarantee*'],
    highlight: false,
  },
]

const TESTIMONIALS = [
  { name: 'Riya Sharma', company: 'Google', role: 'SWE L3', text: 'ACIE\'s AI roadmap was spot on. Got placed in 3 months!', avatar: '👩‍💻' },
  { name: 'Karan Mehta', company: 'Microsoft', role: 'SDE II', text: 'The streak system kept me consistent. Best investment ever.', avatar: '👨‍💻' },
  { name: 'Priya Nair', company: 'Amazon', role: 'SDE I', text: 'Interview simulation felt more real than actual prep courses.', avatar: '👩‍🎓' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ users: 0, problems: 0, placements: 0 })

  useEffect(() => {
    document.documentElement.classList.add('dark')
    const targets = { users: 50000, problems: 2400, placements: 680 }
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const ease = 1 - Math.pow(1 - progress, 3)
      setCounts({
        users: Math.floor(targets.users * ease),
        problems: Math.floor(targets.problems * ease),
        placements: Math.floor(targets.placements * ease),
      })
      if (step >= steps) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#060810', color: '#e8eaf0', fontFamily: 'Syne, sans-serif', overflowX: 'hidden' }}>
      {/* Ambient orbs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {[
          { color: 'rgba(99,102,241,0.18)', left: '10%', top: '20%', size: 400 },
          { color: 'rgba(34,211,238,0.12)', left: '70%', top: '10%', size: 500 },
          { color: 'rgba(244,114,182,0.1)', left: '40%', top: '60%', size: 450 },
        ].map((orb, i) => (
          <motion.div key={i}
            animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: orb.size, height: orb.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              left: orb.left, top: orb.top,
              filter: 'blur(60px)',
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⚡</div>
          <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: -0.5 }}>ACIE</span>
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 14, opacity: 0.6 }}>
          {['Features', 'Pricing', 'Testimonials', 'Blog'].map(n => (
            <span key={n} style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.6}>{n}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/login')}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '9px 20px', color: '#e8eaf0', cursor: 'pointer', fontSize: 14, fontFamily: 'Syne, sans-serif' }}>
            Login
          </button>
          <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.5)' }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/app/dashboard')}
            style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)', border: 'none', borderRadius: 10, padding: '9px 22px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: 'Syne, sans-serif' }}>
            Start Free →
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '100px 20px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: 99, padding: '7px 18px', marginBottom: 36,
              fontSize: 13, color: '#a5b4fc',
            }}
          >
            <span>⚡</span> AI-Powered Career Intelligence Platform — 2026
          </motion.div>

          <h1 style={{ fontSize: 'clamp(38px, 7vw, 86px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, margin: '0 auto 28px', maxWidth: 960 }}>
            Your Career,<br />
            <span style={{ background: 'linear-gradient(90deg, #6366f1, #22d3ee, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Engineered by AI
            </span>
          </h1>

          <p style={{ fontSize: 18, opacity: 0.55, maxWidth: 580, margin: '0 auto 44px', lineHeight: 1.7 }}>
            Master DSA, ace technical interviews, and build job-ready skills — with an adaptive AI engine that knows exactly where you need to grow.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(99,102,241,0.5)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/app/dashboard')}
              style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)', border: 'none', borderRadius: 14, padding: '16px 36px', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 16, fontFamily: 'Syne, sans-serif' }}>
              Start for Free →
            </motion.button>
            <button style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '16px 36px', color: '#e8eaf0', cursor: 'pointer', fontSize: 16, fontFamily: 'Syne, sans-serif' }}>
              ▶ Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: 60, justifyContent: 'center', marginTop: 80, flexWrap: 'wrap' }}>
          {[
            { val: counts.users.toLocaleString() + '+', label: 'Active Learners' },
            { val: counts.problems.toLocaleString() + '+', label: 'Practice Problems' },
            { val: counts.placements.toLocaleString() + '+', label: 'Placements Achieved' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 42, fontWeight: 900, background: 'linear-gradient(90deg, #6366f1, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.val}</div>
              <div style={{ fontSize: 13, opacity: 0.45, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section style={{ position: 'relative', zIndex: 5, padding: '60px 60px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 38, fontWeight: 900, textAlign: 'center', marginBottom: 50 }}>Everything You Need</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.3 }}
              whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(99,102,241,0.15)' }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28 }}>
              <div style={{ fontSize: 34, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 14, opacity: 0.55, lineHeight: 1.7 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ position: 'relative', zIndex: 5, padding: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 50 }}>Success Stories</h2>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 1000, margin: '0 auto' }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} whileHover={{ y: -6 }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 28, flex: '1 1 280px', maxWidth: 320, textAlign: 'left' }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{t.avatar}</div>
              <div style={{ fontSize: 15, opacity: 0.8, lineHeight: 1.6, marginBottom: 16, fontStyle: 'italic' }}>"{t.text}"</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
              <div style={{ fontSize: 12, opacity: 0.5 }}>{t.role} @ {t.company}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ position: 'relative', zIndex: 5, padding: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 50 }}>Simple Pricing</h2>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 960, margin: '0 auto' }}>
          {PRICING.map(p => (
            <motion.div key={p.plan} whileHover={{ y: -10 }}
              style={{
                background: p.highlight ? 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(34,211,238,0.08))' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${p.highlight ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 22, padding: 34, flex: '1 1 260px', maxWidth: 300, textAlign: 'left',
                position: 'relative',
              }}>
              {p.highlight && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #6366f1, #22d3ee)', borderRadius: 99, padding: '4px 16px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
                  Most Popular
                </div>
              )}
              <div style={{ fontSize: 12, fontWeight: 700, color: p.color, marginBottom: 8, letterSpacing: 1 }}>{p.plan.toUpperCase()}</div>
              <div style={{ fontSize: 38, fontWeight: 900, marginBottom: 4 }}>{p.price}<span style={{ fontSize: 16, opacity: 0.5 }}>{p.period}</span></div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '20px 0' }} />
              {p.features.map(f => (
                <div key={f} style={{ fontSize: 14, opacity: 0.7, marginBottom: 10, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: p.color, flexShrink: 0, marginTop: 1 }}>✓</span> {f}
                </div>
              ))}
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/app/dashboard')}
                style={{ marginTop: 24, width: '100%', background: p.highlight ? `linear-gradient(135deg, ${p.color}, #22d3ee)` : 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 12, padding: 14, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: 'Syne, sans-serif' }}>
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', zIndex: 5, padding: '60px 20px 100px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.08))', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 28, padding: '60px 40px', maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: 42, fontWeight: 900, marginBottom: 16 }}>Ready to crack your dream job?</h2>
          <p style={{ fontSize: 16, opacity: 0.55, marginBottom: 36 }}>Join 50,000+ learners who are already on their way to top tech companies.</p>
          <motion.button whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(99,102,241,0.5)' }} whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/app/dashboard')}
            style={{ background: 'linear-gradient(135deg, #6366f1, #22d3ee)', border: 'none', borderRadius: 14, padding: '16px 44px', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 18, fontFamily: 'Syne, sans-serif' }}>
            Start Learning Free →
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 5, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '30px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5, fontSize: 13 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>⚡</span> ACIE Platform © 2026
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Contact', 'Blog'].map(l => <span key={l} style={{ cursor: 'pointer' }}>{l}</span>)}
        </div>
      </footer>
    </div>
  )
}
