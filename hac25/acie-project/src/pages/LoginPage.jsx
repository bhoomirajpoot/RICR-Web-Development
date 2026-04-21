import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => navigate('/app/dashboard'), 1200)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060810', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: 'Syne, sans-serif' }}>
      {/* Left illustration */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.08))',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent)', filter: 'blur(50px)' }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 24 }}>⚡</div>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#e8eaf0', marginBottom: 16 }}>Welcome back!</h2>
          <p style={{ fontSize: 16, opacity: 0.55, color: '#e8eaf0', maxWidth: 320, lineHeight: 1.7 }}>
            Your AI-powered learning journey continues. You're ahead of 72% of users!
          </p>

          <div style={{ display: 'flex', gap: 16, marginTop: 40, justifyContent: 'center' }}>
            {['🔥 7-Day Streak', '⚡ 6,540 XP', '🏆 Rank #4'].map(badge => (
              <div key={badge} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 14px', fontSize: 12, color: '#e8eaf0' }}>
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right form */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 36 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 32 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#e8eaf0' }}>ACIE</span>
            </Link>
            <h1 style={{ fontSize: 30, fontWeight: 900, color: '#e8eaf0', marginBottom: 8 }}>Sign in</h1>
            <p style={{ fontSize: 14, opacity: 0.5, color: '#e8eaf0' }}>Continue your learning streak 🔥</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Social logins */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              {[['G', 'Google'], ['GH', 'GitHub']].map(([icon, label]) => (
                <button key={label} type="button"
                  style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px', color: '#e8eaf0', cursor: 'pointer', fontSize: 13, fontFamily: 'Syne, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 900 }}>{icon}</span> {label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontSize: 12, opacity: 0.4, color: '#e8eaf0' }}>or with email</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            {/* Floating label inputs */}
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <input
                type="email" placeholder=" "
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                id="email" required
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '20px 16px 8px', color: '#e8eaf0', fontSize: 15, outline: 'none', fontFamily: 'Syne, sans-serif', boxSizing: 'border-box' }}
              />
              <label htmlFor="email" style={{ position: 'absolute', left: 16, top: form.email ? 8 : '50%', transform: form.email ? 'none' : 'translateY(-50%)', fontSize: form.email ? 11 : 14, opacity: 0.45, color: '#e8eaf0', transition: 'all 0.2s', pointerEvents: 'none' }}>
                Email address
              </label>
            </div>

            <div style={{ position: 'relative', marginBottom: 12 }}>
              <input
                type="password" placeholder=" "
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                id="password" required
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '20px 16px 8px', color: '#e8eaf0', fontSize: 15, outline: 'none', fontFamily: 'Syne, sans-serif', boxSizing: 'border-box' }}
              />
              <label htmlFor="password" style={{ position: 'absolute', left: 16, top: form.password ? 8 : '50%', transform: form.password ? 'none' : 'translateY(-50%)', fontSize: form.password ? 11 : 14, opacity: 0.45, color: '#e8eaf0', transition: 'all 0.2s', pointerEvents: 'none' }}>
                Password
              </label>
            </div>

            <div style={{ textAlign: 'right', marginBottom: 24 }}>
              <Link to="/forgot-password" style={{ fontSize: 13, color: '#a5b4fc', textDecoration: 'none' }}>Forgot password?</Link>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #22d3ee)', border: 'none', borderRadius: 12, padding: '14px', color: '#fff', fontWeight: 800, cursor: loading ? 'wait' : 'pointer', fontSize: 16, fontFamily: 'Syne, sans-serif' }}>
              {loading ? '⟳ Signing in...' : 'Sign In →'}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, opacity: 0.5, color: '#e8eaf0' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#a5b4fc', fontWeight: 700, textDecoration: 'none' }}>Create one free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
