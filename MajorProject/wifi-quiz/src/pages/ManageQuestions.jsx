import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { adminAPI } from '../services/api';
import { InlineLoader } from '../components/Loader';

const CATEGORIES = ['General', 'Technology', 'Science', 'History', 'Geography', 'Math'];
const DIFFICULTIES = ['easy', 'medium', 'hard'];

const EMPTY_FORM = {
  question: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
  difficulty: 'medium',
  category: 'General',
};

function QuestionModal({ question, onClose, onSave }) {
  const [form, setForm] = useState(question ? {
    question: question.question,
    options: [...question.options],
    correctAnswer: question.correctAnswer,
    difficulty: question.difficulty,
    category: question.category,
  } : { ...EMPTY_FORM, options: ['', '', '', ''] });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.question.trim()) { toast.error('Question text required'); return; }
    if (form.options.some((o) => !o.trim())) { toast.error('All options are required'); return; }
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save question');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700/60 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            {question ? 'Edit Question' : 'Add Question'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">✕</button>
        </div>

        <div className="space-y-4">
          {/* Question text */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Question</label>
            <textarea
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-400 resize-none"
              placeholder="Enter your question..."
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Options</label>
            <div className="space-y-2">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button
                    onClick={() => setForm((f) => ({ ...f, correctAnswer: i }))}
                    className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold transition-all
                      ${form.correctAnswer === i
                        ? 'bg-brand-500 text-white shadow-brand'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:bg-brand-100'}`}
                    title="Set as correct answer"
                  >
                    {String.fromCharCode(65 + i)}
                  </button>
                  <input
                    value={opt}
                    onChange={(e) => {
                      const opts = [...form.options];
                      opts[i] = e.target.value;
                      setForm((f) => ({ ...f, options: opts }));
                    }}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-400"
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  />
                </div>
              ))}
              <p className="text-xs text-slate-400">Click the letter to set correct answer</p>
            </div>
          </div>

          {/* Difficulty & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-400"
              >
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-400"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all disabled:opacity-60"
          >
            {saving ? 'Saving...' : question ? 'Save Changes' : 'Add Question'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────
// User Management Table
// ──────────────────────────────────────────────
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getUsers()
      .then(({ data }) => setUsers(data.users || data || []))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  // Demo fallback
  const demoUsers = users.length ? users : [
    { _id: '1', name: 'Alice Martin', email: 'alice@example.com', role: 'user', attempts: 3, bestScore: 85, createdAt: '2025-01-15' },
    { _id: '2', name: 'Bob Chen', email: 'bob@example.com', role: 'user', attempts: 5, bestScore: 62, createdAt: '2025-01-18' },
    { _id: '3', name: 'Carol Davis', email: 'carol@example.com', role: 'admin', attempts: 1, bestScore: 92, createdAt: '2025-01-20' },
    { _id: '4', name: 'David Kim', email: 'david@example.com', role: 'user', attempts: 2, bestScore: 70, createdAt: '2025-02-01' },
  ];

  const filtered = demoUsers.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="search"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-brand-400"
        />
        <span className="text-sm text-slate-400">{filtered.length} users</span>
      </div>

      {loading ? <InlineLoader /> : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60">
              <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                <th className="text-left px-4 py-3">User</th>
                <th className="text-left px-4 py-3">Role</th>
                <th className="text-left px-4 py-3">Attempts</th>
                <th className="text-left px-4 py-3">Best Score</th>
                <th className="text-left px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name?.[0]}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${user.role === 'admin'
                        ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{user.attempts ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`font-mono font-medium ${user.bestScore >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                      {user.bestScore ? `${user.bestScore}%` : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Main Manage Questions Page (with tabs)
// ──────────────────────────────────────────────
export default function ManageQuestions() {
  const [tab, setTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | question object
  const [deleting, setDeleting] = useState(null);

  const fetchQuestions = () => {
    adminAPI.getQuestions()
      .then(({ data }) => setQuestions(data.questions || data || []))
      .catch(() => toast.error('Failed to load questions'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchQuestions(); }, []);

  const handleSave = async (formData) => {
    if (modal && modal._id) {
      await adminAPI.updateQuestion(modal._id, formData);
      toast.success('Question updated');
    } else {
      await adminAPI.addQuestion(formData);
      toast.success('Question added');
    }
    fetchQuestions();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    setDeleting(id);
    try {
      await adminAPI.deleteQuestion(id);
      setQuestions((qs) => qs.filter((q) => q._id !== id));
      toast.success('Question deleted');
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  // Demo fallback questions
  const demoQuestions = questions.length ? questions : [
    { _id: '1', question: 'What does WiFi stand for?', options: ['Wireless Fidelity', 'Wide Frequency', 'Wire-Free Internet', 'Wireless Facility'], difficulty: 'easy', category: 'Technology', correctAnswer: 0 },
    { _id: '2', question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], difficulty: 'easy', category: 'Geography', correctAnswer: 2 },
    { _id: '3', question: 'Which element has the symbol "Au"?', options: ['Silver', 'Gold', 'Copper', 'Iron'], difficulty: 'medium', category: 'Science', correctAnswer: 1 },
  ];

  const diffColor = {
    easy: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400',
    medium: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400',
    hard: 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Admin Panel</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage questions and users</p>
          </div>
          {tab === 'questions' && (
            <button
              onClick={() => setModal(true)}
              className="px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all shadow-brand flex items-center gap-2"
            >
              <span>+</span> Add Question
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 w-fit">
          {['questions', 'users'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize
                ${tab === t ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-card dark:shadow-card-dark border border-slate-200/60 dark:border-slate-700/60 p-6 sm:p-8">
          {tab === 'questions' ? (
            loading ? <InlineLoader /> : (
              <div className="space-y-3">
                {demoQuestions.map((q, i) => (
                  <motion.div
                    key={q._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 dark:text-slate-200 text-sm mb-2">{q.question}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffColor[q.difficulty]}`}>{q.difficulty}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">{q.category}</span>
                        <span className="text-xs text-slate-400">{q.options.length} options</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setModal(q)}
                        className="p-2 rounded-lg text-slate-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(q._id)}
                        disabled={deleting === q._id}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </motion.div>
                ))}

                {demoQuestions.length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <p className="text-4xl mb-3">📭</p>
                    <p>No questions yet. Add your first one!</p>
                  </div>
                )}
              </div>
            )
          ) : (
            <UserManagement />
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal !== null && (
          <QuestionModal
            question={modal === true ? null : modal}
            onClose={() => setModal(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
