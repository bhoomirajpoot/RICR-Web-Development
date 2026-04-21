import { useSelector, useDispatch } from 'react-redux'
import { toggleTask, addTask, addXp, bookmarkProblem, markProblemSolved, updateCourseProgress } from '../store/slices/userSlice'

export const useUser = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return {
    ...user,
    toggleTask: (id) => dispatch(toggleTask(id)),
    addTask: (text) => dispatch(addTask(text)),
    addXp: (amount) => dispatch(addXp(amount)),
    bookmarkProblem: (id) => dispatch(bookmarkProblem(id)),
    markProblemSolved: (id) => dispatch(markProblemSolved(id)),
    updateCourseProgress: (courseId, progress) => dispatch(updateCourseProgress({ courseId, progress })),
    completedTasksCount: user.tasks.filter(t => t.done).length,
    taskCompletionPercent: Math.round((user.tasks.filter(t => t.done).length / user.tasks.length) * 100),
  }
}
