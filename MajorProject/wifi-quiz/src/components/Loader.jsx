import { motion } from 'framer-motion';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-slate-900">
      {/* Animated WiFi rings */}
      <div className="relative w-20 h-20 mb-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-brand-400"
            initial={{ opacity: 0.8, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{
              duration: 1.8,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-brand-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1.5 8.5a13 13 0 0121 0M5 12a10 10 0 0114 0M8.5 15.5a5 5 0 017 0M12 19h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </div>
      <p className="text-slate-500 dark:text-slate-400 font-body text-sm tracking-wide">{text}</p>
    </div>
  );
}

export function InlineLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="w-8 h-8 border-3 border-brand-200 border-t-brand-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        style={{ borderWidth: 3 }}
      />
    </div>
  );
}
