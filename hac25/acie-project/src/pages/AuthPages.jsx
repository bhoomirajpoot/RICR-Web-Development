import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => navigate('/otp'), 1000)
  }

  const Field = ({ id, label, type = 'text' }) => (
    <div style={{ position: 'relative', marginBottom: 20 }}>
      <input type={type} placeholder=" " id={id} value={form[id]} required
        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
        style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '20px 16px 8px', color: '#e8eaf0', fontSize: 15, outline: 'none', fontFamily: 'Syne, sans-serif', boxSizing: 'border-box' }} />
      <label htmlFor={id} style={{ position: 'absolute', left: 16, top: form[id] ? 8 : '50%', transform: form[id] ? 'none' : 'translateY(-50%)', fontSize: form[id] ? 11 : 14, opacity: 0.45, color: '#e8eaf0', transition: 'all 0.2s', pointerEvents: 'none' }}>
        {label}
      </label>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#060810', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: 'Syne, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(244,114,182,0.12), rgba(99,102,241,0.1))', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '30%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,114,182,0.2), transparent)', filter: 'blur(60px)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 80, marginBottom: 24 }}>🚀</div>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: '#e8eaf0', marginBottom: 16 }}>Start your journey</h2>
          <p style={{ fontSize: 16, opacity: 0.55, color: '#e8eaf0', lineHeight: 1.7 }}>Join 50,000+ learners building their dream career with AI.</p>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['✅ Personalized AI roadmap', '✅ Daily coding challenges', '✅ Mock interview practice', '✅ Job placement support'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#e8eaf0', opacity: 0.7 }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ width: '100%', maxWidth: 400 }}>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: '#e8eaf0', marginBottom: 8 }}>Create account</h1>
          <p style={{ fontSize: 14, opacity: 0.5, color: '#e8eaf0', marginBottom: 32 }}>Free forever. No credit card required.</p>
          <form onSubmit={handleSubmit}>
            <Field id="name" label="Full Name" />
            <Field id="email" label="Email address" type="email" />
            <Field id="password" label="Password (min 8 chars)" type="password" />
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}
              style={{ width: '100%', background: 'linear-gradient(135deg, #f472b6, #6366f1)', border: 'none', borderRadius: 12, padding: 14, color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 16, fontFamily: 'Syne, sans-serif', marginBottom: 16 }}>
              {loading ? '⟳ Creating...' : 'Create Account →'}
            </motion.button>
          </form>
          <p style={{ textAlign: 'center', fontSize: 14, opacity: 0.5, color: '#e8eaf0' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#a5b4fc', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#060810', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 48, width: '100%', maxWidth: 440 }}>
        <div style={{ fontSize: 48, marginBottom: 16, textAlign: 'center' }}>🔐</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#e8eaf0', marginBottom: 8, textAlign: 'center' }}>Forgot Password?</h1>
        <p style={{ fontSize: 14, opacity: 0.5, color: '#e8eaf0', marginBottom: 32, textAlign: 'center' }}>Enter your email to receive a reset link.</p>
        {!sent ? (
          <>
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '14px 16px', color: '#e8eaf0', fontSize: 15, outline: 'none', fontFamily: 'Syne, sans-serif', boxSizing: 'border-box' }} />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => setSent(true)}
              style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #22d3ee)', border: 'none', borderRadius: 12, padding: 14, color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 16, fontFamily: 'Syne, sans-serif' }}>
              Send Reset Link →
            </motion.button>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <p style={{ color: '#4ade80', fontWeight: 700, fontSize: 16, marginBottom: 24 }}>Reset link sent! Check your inbox.</p>
            <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 24px', color: '#e8eaf0', cursor: 'pointer', fontFamily: 'Syne, sans-serif' }}>
              Back to Login
            </button>
          </motion.div>
        )}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13 }}>
          <Link to="/login" style={{ color: '#a5b4fc', textDecoration: 'none' }}>← Back to Login</Link>
        </p>
      </motion.div>
    </div>
  )
}

export function OtpPage() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [verified, setVerified] = useState(false)

  const handleChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus()
  }

  const verify = () => {
    setVerified(true)
    setTimeout(() => navigate('/app/dashboard'), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060810', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 48, width: '100%', maxWidth: 420, textAlign: 'center' }}>
        {!verified ? (
          <>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📱</div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#e8eaf0', marginBottom: 8 }}>Verify Email</h1>
            <p style={{ fontSize: 14, opacity: 0.5, color: '#e8eaf0', marginBottom: 36 }}>Enter the 6-digit code sent to your email</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
              {otp.map((digit, i) => (
                <input key={i} id={`otp-${i}`} value={digit} maxLength={1}
                  onChange={e => handleChange(e.target.value, i)}
                  onKeyDown={e => e.key === 'Backspace' && !digit && i > 0 && document.getElementById(`otp-${i - 1}`)?.focus()}
                  style={{ width: 48, height: 56, textAlign: 'center', background: 'rgba(255,255,255,0.06)', border: `1px solid ${digit ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 12, color: '#e8eaf0', fontSize: 22, fontWeight: 900, outline: 'none', fontFamily: 'JetBrains Mono, monospace' }} />
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={verify}
              style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #22d3ee)', border: 'none', borderRadius: 12, padding: 14, color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 16, fontFamily: 'Syne, sans-serif' }}>
              Verify OTP →
            </motion.button>
            <p style={{ marginTop: 20, fontSize: 13, opacity: 0.5, color: '#e8eaf0' }}>
              Didn't receive? <span style={{ color: '#a5b4fc', cursor: 'pointer' }}>Resend code</span>
            </p>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: '#4ade80' }}>Email Verified!</h2>
            <p style={{ fontSize: 14, opacity: 0.5, color: '#e8eaf0', marginTop: 8 }}>Redirecting to dashboard...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default SignupPage
