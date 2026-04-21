import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { tickPomodoro, togglePomodoroActive, resetPomodoro } from '../store/slices/uiSlice'

export const usePomodoro = () => {
  const dispatch = useDispatch()
  const { pomodoroTime, pomodoroActive } = useSelector(state => state.ui)

  useEffect(() => {
    if (!pomodoroActive) return
    const interval = setInterval(() => dispatch(tickPomodoro()), 1000)
    return () => clearInterval(interval)
  }, [pomodoroActive, dispatch])

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return {
    time: pomodoroTime,
    active: pomodoroActive,
    formatted: formatTime(pomodoroTime),
    toggle: () => dispatch(togglePomodoroActive()),
    reset: () => dispatch(resetPomodoro()),
  }
}
