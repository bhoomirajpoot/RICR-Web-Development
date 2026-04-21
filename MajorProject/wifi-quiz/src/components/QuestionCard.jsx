import { motion } from 'framer-motion';

/**
 * Renders a single quiz question with animated option selection.
 * Props:
 *   question  – { _id, question, options: string[], difficulty, category }
 *   selected  – currently selected option index (or null)
 *   onSelect  – callback(index: number)
 *   index     – question number (0-based)
 *   total     – total questions
 */
export default function QuestionCard({ question, selected, onSelect, index, total }) {
  const difficultyColor = {
    easy: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400',
    medium: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400',
    hard: 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400',
  }[question.difficulty] || 'text-slate-600 bg-slate-100';

  return (
    <motion.div
      key={question._id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Question meta */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColor}`}>
          {question.difficulty}
        </span>
        {question.category && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            {question.category}
          </span>
        )}
        <span className="ml-auto text-xs text-slate-400 font-mono">
          {index + 1} / {total}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white leading-relaxed mb-6">
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <motion.button
              key={i}
              onClick={() => onSelect(i)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 font-medium text-sm sm:text-base
                ${isSelected
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 shadow-brand'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-300 hover:bg-brand-50/50 dark:hover:bg-brand-900/10'
                }`}
            >
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full mr-3 text-xs font-bold flex-shrink-0
                ${isSelected ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
