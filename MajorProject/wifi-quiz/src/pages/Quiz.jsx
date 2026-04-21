import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { quizAPI } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import { InlineLoader } from '../components/Loader';

const QUESTION_TIME = 30; // seconds per question

export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef(null);

  // Fetch questions
  useEffect(() => {
    quizAPI.getQuestions()
      .then(({ data }) => {
        setQuestions(data.questions || data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Failed to load questions');
        setLoading(false);
      });
  }, []);

  const handleSubmit = useCallback(async (finalAnswers) => {
    if (submitting || submitted) return;
    setSubmitting(true);
    setSubmitted(true);
    clearInterval(timerRef.current);
    try {
      const { data } = await quizAPI.submitAttempt(
        Object.entries(finalAnswers).map(([questionId, selectedOption]) => ({
          questionId,
          selectedOption,
        }))
      );
      navigate('/result', { state: { result: data } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit quiz');
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  }, [submitting, submitted, navigate]);

  // Timer per question
  useEffect(() => {
    if (!questions.length || loading) return;
    setTimeLeft(QUESTION_TIME);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          // Auto-advance or submit
          const isLast = current === questions.length - 1;
          if (isLast) {
            handleSubmit(answers);
          } else {
            setCurrent((c) => c + 1);
          }
          return QUESTION_TIME;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [current, questions.length, loading]); // eslint-disable-line

  const handleSelect = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[current]._id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (answers[questions[current]._id] === undefined) {
      toast.error('Please select an answer before continuing');
      return;
    }
    if (current === questions.length - 1) {
      handleSubmit(answers);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  if (loading) return <InlineLoader />;

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 dark:text-slate-400">
        No questions available at this time.
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerColor = timeLeft > 10 ? 'bg-brand-500' : timeLeft > 5 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-50 dark:from-slate-950 dark:to-slate-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Question {current + 1} of {questions.length}
            </span>
            {/* Timer */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono font-semibold
              ${timeLeft <= 5 ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 animate-pulse' :
                timeLeft <= 10 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' :
                'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {String(timeLeft).padStart(2, '0')}s
            </div>
          </div>

          {/* Overall progress */}
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Timer bar */}
          <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
            <motion.div
              className={`h-full ${timerColor} rounded-full transition-colors`}
              animate={{ width: `${timerPct}%` }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-card dark:shadow-card-dark border border-slate-200/60 dark:border-slate-700/60 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={q._id}
              question={q}
              selected={answers[q._id] ?? null}
              onSelect={handleSelect}
              index={current}
              total={questions.length}
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-brand-500 w-4' :
                    answers[questions[i]._id] !== undefined ? 'bg-brand-300' :
                    'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <motion.button
              onClick={handleNext}
              disabled={submitting}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-sm shadow-brand hover:from-brand-600 hover:to-brand-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Submitting...
                </>
              ) : current === questions.length - 1 ? (
                <>Submit Quiz <span>→</span></>
              ) : (
                <>Next <span>→</span></>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
