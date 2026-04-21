import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from '@monaco-editor/react'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import { useTheme } from '../hooks/useTheme'
import { useUser } from '../hooks/useUser'
import { problems } from '../assets/data/mockData'

const DIFF_COLORS = { Easy: '#4ade80', Medium: '#facc15', Hard: '#f87171' }
const LANGUAGES = ['JavaScript', 'Python', 'Java', 'C++']

export default function CodingPage() {
  const { colors, isDark } = useTheme()
  const { xp, rank, solvedProblems, bookmarkProblem, bookmarkedProblems, markProblemSolved, addXp } = useUser()

  const [selectedProblem, setSelectedProblem] = useState(problems[0])
  const [lang, setLang] = useState('JavaScript')
  const [code, setCode] = useState(problems[0].starterCode.JavaScript)
  const [output, setOutput] = useState('')
  const [filter, setFilter] = useState('All')
  const [running, setRunning] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [tab, setTab] = useState('description')

  const selectProblem = (p) => {
    setSelectedProblem(p)
    setCode(p.starterCode[lang] || p.starterCode.JavaScript)
    setOutput('')
    setShowSolution(false)
    setTab('description')
  }

  const changeLang = (l) => {
    setLang(l)
    setCode(selectedProblem.starterCode[l] || selectedProblem.starterCode.JavaScript)
  }

  const runCode = () => {
    setRunning(true)
    setOutput('')
    setTimeout(() => {
      setRunning(false)
      setOutput(`✅ All test cases passed!\n\nTest 1: ${selectedProblem.examples[0]?.input} → ${selectedProblem.examples[0]?.output} ✓\n\nRuntime: 72ms (beats 94.3%)\nMemory: 42.1 MB (beats 87.2%)`)
    }, 1400)
  }

  const submit = () => {
    if (!solvedProblems.includes(selectedProblem.id)) {
      markProblemSolved(selectedProblem.id)
      addXp(selectedProblem.xp)
      setOutput(`🎉 Accepted!\n\n+${selectedProblem.xp} XP earned!\nProblem added to solved list.`)
    } else {
      setOutput('✅ Already solved! Great work.')
    }
  }

  const filtered = problems.filter(p => filter === 'All' || p.difficulty === filter)

  return (
    <div style={{ color: colors.text, height: 'calc(100vh - 90px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0 }}>Coding Platform</h1>
          <p style={{ fontSize: 13, opacity: 0.45, margin: '4px 0 0' }}>Daily Challenge: Two Sum ⚡</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ background: 'rgba(250,204,21,0.12)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: 10, padding: '6px 14px', fontSize: 13, color: '#facc15', fontWeight: 700 }}>
            ⚡ {xp.toLocaleString()} XP · Rank #{rank}
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {['All', 'Easy', 'Medium', 'Hard'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'Syne, sans-serif', fontWeight: 600,
                  background: filter === f ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)',
                  color: filter === f ? '#a5b4fc' : colors.textMuted }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 14, flex: 1, overflow: 'hidden' }}>
        {/* Problem list */}
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map(p => {
            const solved = solvedProblems.includes(p.id)
            const bookmarked = bookmarkedProblems.includes(p.id)
            return (
              <motion.div key={p.id} whileHover={{ x: 4 }} onClick={() => selectProblem(p)}
                style={{
                  background: selectedProblem.id === p.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${selectedProblem.id === p.id ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 12, padding: '12px 14px', cursor: 'pointer',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{p.title}</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {bookmarked && <span style={{ fontSize: 12 }}>🔖</span>}
                    {solved && <span style={{ fontSize: 12, color: '#4ade80' }}>✓</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  <Badge text={p.difficulty} color={DIFF_COLORS[p.difficulty]} size="xs" />
                  {p.tags.slice(0, 1).map(t => <Badge key={t} text={t} color="#6b7280" size="xs" />)}
                </div>
                <div style={{ fontSize: 11, opacity: 0.4, marginTop: 5, color: colors.text }}>+{p.xp} XP</div>
              </motion.div>
            )
          })}
        </div>

        {/* Editor area */}
        <div style={{ display: 'grid', gridTemplateRows: '1fr 180px', gap: 12, overflow: 'hidden' }}>
          {/* Top: description + editor */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, overflow: 'hidden' }}>
            {/* Problem panel */}
            <GlassCard style={{ overflowY: 'auto', padding: 18 }}>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                {['description', 'examples', 'hints'].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding: '5px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'Syne, sans-serif', fontWeight: 600, textTransform: 'capitalize',
                      background: tab === t ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)',
                      color: tab === t ? '#a5b4fc' : colors.textMuted }}>
                    {t}
                  </button>
                ))}
                <button onClick={() => bookmarkProblem(selectedProblem.id)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16 }}>
                  {bookmarkedProblems.includes(selectedProblem.id) ? '🔖' : '🏷️'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                <Badge text={selectedProblem.difficulty} color={DIFF_COLORS[selectedProblem.difficulty]} />
                {selectedProblem.tags.map(t => <Badge key={t} text={t} color="#6b7280" />)}
              </div>

              <h3 style={{ margin: '0 0 12px', fontSize: 17, fontWeight: 800, color: colors.text }}>{selectedProblem.title}</h3>

              {tab === 'description' && (
                <p style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.7, color: colors.text }}>{selectedProblem.description}</p>
              )}

              {tab === 'examples' && selectedProblem.examples.map((ex, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 12, marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, marginBottom: 6 }}>EXAMPLE {i + 1}</div>
                  <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', opacity: 0.8 }}>
                    <div>Input: {ex.input}</div>
                    <div>Output: {ex.output}</div>
                  </div>
                </div>
              ))}

              {tab === 'hints' && (
                <div>
                  <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 10 }}>⏱ Time: {selectedProblem.timeHint}</div>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>💾 Space: {selectedProblem.spaceHint}</div>
                  <button onClick={() => setShowSolution(!showSolution)}
                    style={{ marginTop: 16, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 10, padding: '8px 16px', color: '#a5b4fc', cursor: 'pointer', fontSize: 13, fontFamily: 'Syne, sans-serif' }}>
                    {showSolution ? '🙈 Hide' : '💡 Show'} Solution Approach
                  </button>
                  <AnimatePresence>
                    {showSolution && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        style={{ marginTop: 12, background: 'rgba(99,102,241,0.08)', borderRadius: 10, padding: 12, fontSize: 13, opacity: 0.8, color: colors.text }}>
                        Use a hash map to store each number's index. For each number, check if its complement (target - num) exists in the map. O(n) time complexity.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </GlassCard>

            {/* Code editor */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                <select value={lang} onChange={e => changeLang(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '7px 12px', color: colors.text, fontSize: 13, cursor: 'pointer', fontFamily: 'Syne, sans-serif' }}>
                  {LANGUAGES.map(l => <option key={l} value={l} style={{ background: '#1a1a2e' }}>{l}</option>)}
                </select>
                <div style={{ flex: 1 }} />
                <Button variant="success" size="sm" onClick={runCode} disabled={running}>
                  {running ? '⟳' : '▶'} Run
                </Button>
                <Button variant="primary" size="sm" onClick={submit}>Submit</Button>
              </div>

              <div style={{ flex: 1, background: '#0d1117', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                <div style={{ padding: '7px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 11, opacity: 0.35, fontFamily: 'JetBrains Mono, monospace', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, background: '#f87171', borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ width: 8, height: 8, background: '#facc15', borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ marginLeft: 6 }}>solution.{lang === 'Python' ? 'py' : lang === 'Java' ? 'java' : lang === 'C++' ? 'cpp' : 'js'}</span>
                </div>
                <Editor
                  height="calc(100% - 36px)"
                  language={lang === 'C++' ? 'cpp' : lang.toLowerCase()}
                  theme="vs-dark"
                  value={code}
                  onChange={v => setCode(v || '')}
                  options={{
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    padding: { top: 12 },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Output console */}
          <GlassCard style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.4, marginBottom: 8, letterSpacing: 1 }}>OUTPUT CONSOLE</div>
            {running ? (
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                    style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }} />
                ))}
                <span style={{ fontSize: 13, opacity: 0.5, marginLeft: 4 }}>Running test cases...</span>
              </div>
            ) : (
              <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: output.startsWith('✅') || output.startsWith('🎉') ? '#4ade80' : output.startsWith('❌') ? '#f87171' : '#a5b4fc', margin: 0, opacity: output ? 1 : 0.3, whiteSpace: 'pre-wrap' }}>
                {output || '// Click Run to execute your code against test cases'}
              </pre>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
