import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'
import ProgressBar from '../ui/ProgressBar'
import { useUser } from '../../hooks/useUser'

const StudyPlanCard = () => {
  const { tasks, toggleTask, completedTasksCount, taskCompletionPercent } = useUser()

  return (
    <GlassCard>
      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#e8eaf0' }}>
        📋 Today's Study Plan
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
          <span style={{ opacity: 0.5, color: '#e8eaf0' }}>Progress</span>
          <span style={{ color: '#6366f1', fontWeight: 700 }}>{completedTasksCount}/{tasks.length} tasks</span>
        </div>
        <ProgressBar value={taskCompletionPercent} height={5} />
      </div>

      <div>
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4 }}
            onClick={() => toggleTask(task.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 0',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              cursor: 'pointer',
            }}
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                background: task.done ? 'linear-gradient(135deg, #6366f1, #22d3ee)' : 'rgba(255,255,255,0.07)',
                border: task.done ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: '#fff',
                transition: 'background 0.2s',
              }}
            >
              {task.done && '✓'}
            </motion.div>
            <span style={{
              fontSize: 13,
              opacity: task.done ? 0.35 : 0.8,
              color: '#e8eaf0',
              textDecoration: task.done ? 'line-through' : 'none',
              transition: 'all 0.2s',
            }}>
              {task.text}
            </span>
            {task.done && (
              <span style={{ marginLeft: 'auto', fontSize: 11, color: '#4ade80' }}>+50 XP</span>
            )}
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

export default StudyPlanCard
