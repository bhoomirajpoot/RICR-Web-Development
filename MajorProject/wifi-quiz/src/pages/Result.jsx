import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PASS_THRESHOLD = 70; // percent

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) {
    navigate('/quiz');
    return null;
  }

  const { score, total, percentage, passed, answers: reviewAnswers, attemptsLeft } = result;
  const isPassed = passed ?? percentage >= PASS_THRESHOLD;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Result hero */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
          className="text-center mb-10"
        >
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 text-4xl shadow-lg
            ${isPassed ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-red-100 dark:bg-red-900/40'}`}
          >
            {isPassed ? '🏆' : '😔'}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4
              ${isPassed
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}
            >
              {isPassed ? '✓ PASSED' : '✗ FAILED'}
            </span>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2">
              {isPassed ? 'WiFi Access Granted!' : 'Access Denied'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {isPassed
                ? 'Great job! You can now connect to the network.'
                : 'You need to score higher to gain access.'}
            </p>
          </motion.div>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-card dark:shadow-card-dark border border-slate-200/60 dark:border-slate-700/60 p-6 sm:p-8 mb-6"
        >
          <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800 text-center mb-8">
            {[
              { label: 'Score', value: `${score}/${total}` },
              { label: 'Percentage', value: `${Math.round(percentage)}%` },
              { label: 'Pass Mark', value: `${PASS_THRESHOLD}%` },
            ].map(({ label, value }) => (
              <div key={label} className="px-4">
                <p className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">{value}</p>
                <p className="text-xs text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Score bar */}
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${isPassed ? 'bg-emerald-500' : 'bg-red-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentage, 100)}%` }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Threshold marker */}
          <div className="relative">
            <div
              className="absolute top-0 w-0.5 h-3 bg-slate-400"
              style={{ left: `${PASS_THRESHOLD}%`, marginTop: '-12px' }}
            />
            <p className="text-xs text-slate-400 mt-1" style={{ marginLeft: `${PASS_THRESHOLD}%` }}>
              pass
            </p>
          </div>
        </motion.div>

        {/* Answer review */}
        {reviewAnswers && reviewAnswers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-card dark:shadow-card-dark border border-slate-200/60 dark:border-slate-700/60 p-6 sm:p-8 mb-6"
          >
            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-5">Answer Review</h2>
            <div className="space-y-5">
              {reviewAnswers.map((item, i) => (
                <div key={i} className={`p-4 rounded-2xl border-l-4 ${item.correct ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-red-500 bg-red-50 dark:bg-red-900/10'}`}>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    <span className="text-slate-400 mr-2">Q{i + 1}.</span>
                    {item.question}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                    <span className={`font-medium ${item.correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                      Your answer: {item.selectedAnswer}
                    </span>
                    {!item.correct && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium sm:ml-4">
                        ✓ Correct: {item.correctAnswer}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          {!isPassed && attemptsLeft > 0 && (
            <button
              onClick={() => navigate('/quiz')}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-sm shadow-brand hover:from-brand-600 hover:to-brand-700 transition-all"
            >
              Retry Quiz ({attemptsLeft} left)
            </button>
          )}
          {isPassed && (
            <div className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm text-center shadow-lg">
              🌐 Connected to QuizNet WiFi
            </div>
          )}
          <button
            onClick={() => navigate('/')}
            className="py-3.5 px-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
