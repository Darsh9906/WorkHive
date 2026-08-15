import React, { useContext } from 'react'
import { Calendar, PlayCircle, CheckCircle2, XCircle } from 'lucide-react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from '../Common/StateComponents'
import { persistEmployees } from '../../utils/localStorage'

const AcceptTask = ({ data }) => {
  const { userData, setUserData } = useContext(AuthContext)
  const { showToast } = useToast()

  const handleUpdateStatus = (newStatus) => {
    const loggedInUserStr = localStorage.getItem('loggedInUser')
    if (!loggedInUserStr || !data?.id) return

    const loggedInUser = JSON.parse(loggedInUserStr)
    const currentEmployeeId = loggedInUser.data?.id
    let taskUpdated = false

    const updatedEmployees = (userData?.employee || []).map((emp) => {
      if (String(emp.id) !== String(currentEmployeeId)) return emp

      const updatedTasks = (emp.tasks || []).map((task) => {
        if (task.id !== data.id) return task
        if (String(task.employeeId) !== String(currentEmployeeId)) return task
        if (task.status !== 'pending') {
          return task
        }

        taskUpdated = true
        const nextStatus = newStatus === 'completed' ? 'completed' : 'failed'
        return {
          ...task,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
          completedAt: nextStatus === 'completed' ? (task.completedAt || new Date().toISOString()) : task.completedAt || null,
          failedAt: nextStatus === 'failed' ? (task.failedAt || new Date().toISOString()) : task.failedAt || null,
        }
      })

      return { ...emp, tasks: updatedTasks }
    })

    if (!taskUpdated) {
      showToast('Task cannot be updated from this view.', 'error')
      return
    }

    const persistedEmployees = persistEmployees(updatedEmployees)
    setUserData({ ...userData, employee: persistedEmployees })

    if (newStatus === 'completed') {
      showToast(`Task completed: "${data.title || data.taskTitle}"`, 'success')
    } else {
      showToast(`Task marked as failed: "${data.title || data.taskTitle}"`, 'error')
    }

    const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
    if (currentUser?.data) {
      const refreshedEmployee = persistedEmployees.find((emp) => String(emp.id) === String(currentEmployeeId))
      localStorage.setItem('loggedInUser', JSON.stringify({ ...currentUser, data: refreshedEmployee || currentUser.data }))
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[230px]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md text-xs font-medium">
            {data.category || 'General'}
          </span>
          <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1">
            <PlayCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            {data.status || 'Pending'}
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">{data.title || data.taskTitle}</h3>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {data.description || data.taskDescription}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span>Due: {data.dueDate || data.taskDate || 'No date'}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleUpdateStatus('completed')}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-2.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complete</span>
          </button>
          <button
            onClick={() => handleUpdateStatus('failed')}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-2.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Fail</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AcceptTask