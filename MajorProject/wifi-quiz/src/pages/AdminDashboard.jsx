import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import toast from 'react-hot-toast';
import { adminAPI } from '../services/api';
import { InlineLoader } from '../components/Loader';

const COLORS = ['#0ea5e9', '#f97316', '#10b981', '#8b5cf6'];

const StatCard = ({ label, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card dark:shadow-card-dark border border-slate-200/60 dark:border-slate-700/60"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
        <p className="text-3xl font-display font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-xl text-xl ${color}`}>{icon}</div>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminAPI.getStats(), adminAPI.getRecentActivity()])
      .then(([statsRes, activityRes]) => {
        setStats(statsRes.data);
        setActivity(activityRes.data.activity || activityRes.data || []);
      })
      .catch(() => toast.error('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-16"><InlineLoader /></div>;

  // Fallback demo data if backend not connected
  const demoStats = stats || {
    totalUsers: 248,
    totalAttempts: 712,
    passRate: 63,
    avgScore: 71,
    scoreDistribution: [
      { name: '0-25%', count: 42 },
      { name: '26-50%', count: 118 },
      { name: '51-75%', count: 224 },
      { name: '76-100%', count: 328 },
    ],
    attemptsOverTime: [
      { date: 'Mon', attempts: 45 },
      { date: 'Tue', attempts: 72 },
      { date: 'Wed', attempts: 88 },
      { date: 'Thu', attempts: 61 },
      { date: 'Fri', attempts: 113 },
      { date: 'Sat', attempts: 89 },
      { date: 'Sun', attempts: 47 },
    ],
    passFail: [
      { name: 'Passed', value: 449 },
      { name: 'Failed', value: 263 },
    ],
  };

  const statCards = [
    { label: 'Total Users', value: demoStats.totalUsers?.toLocaleString(), icon: '👥', color: 'bg-brand-50 dark:bg-brand-900/30 text-brand-600', delay: 0 },
    { label: 'Total Attempts', value: demoStats.totalAttempts?.toLocaleString(), icon: '📝', color: 'bg-accent-50 dark:bg-accent-900/30 text-accent-600', delay: 0.05 },
    { label: 'Pass Rate', value: `${demoStats.passRate}%`, icon: '✅', color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600', delay: 0.1 },
    { label: 'Avg Score', value: `${demoStats.avgScore}%`, icon: '📊', color: 'bg-violet-50 dark:bg-violet-900/30 text-violet-600', delay: 0.15 },
  ];

  const demoActivity = activity.length ? activity : [
    { user: 'Alice Martin', email: 'alice@example.com', score: '85%', status: 'Passed', time: '2m ago' },
    { user: 'Bob Chen', email: 'bob@example.com', score: '55%', status: 'Failed', time: '8m ago' },
    { user: 'Carol Davis', email: 'carol@example.com', score: '92%', status: 'Passed', time: '15m ago' },
    { user: 'David Kim', email: 'david@example.com', score: '68%', status: 'Failed', time: '23m ago' },
    { user: 'Eve Johnson', email: 'eve@example.com', score: '78%', status: 'Passed', time: '31m ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of quiz activity and user performance</p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Attempts over time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card dark:shadow-card-dark border border-slate-200/60 dark:border-slate-700/60"
          >
            <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Attempts This Week</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={demoStats.attemptsOverTime}>
                <defs>
                  <linearGradient id="colorAttempts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="attempts" stroke="#0ea5e9" strokeWidth={2} fill="url(#colorAttempts)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pass/Fail pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card dark:shadow-card-dark border border-slate-200/60 dark:border-slate-700/60"
          >
            <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Pass vs Fail</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={demoStats.passFail} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {demoStats.passFail.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? '#10b981' : '#f97316'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Score distribution */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card dark:shadow-card-dark border border-slate-200/60 dark:border-slate-700/60"
          >
            <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Score Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={demoStats.scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {demoStats.scoreDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent activity table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-card dark:shadow-card-dark border border-slate-200/60 dark:border-slate-700/60"
          >
            <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <th className="text-left py-2 pr-4">User</th>
                    <th className="text-left py-2 pr-4">Score</th>
                    <th className="text-left py-2 pr-4">Status</th>
                    <th className="text-left py-2">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {demoActivity.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 pr-4">
                        <p className="font-medium text-slate-800 dark:text-slate-200">{row.user}</p>
                      </td>
                      <td className="py-2.5 pr-4 font-mono text-slate-600 dark:text-slate-400">{row.score}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                          ${row.status === 'Passed'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-400 text-xs">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
