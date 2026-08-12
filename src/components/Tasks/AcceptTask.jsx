import React, { useContext } from 'react'
import { Calendar, PlayCircle, CheckCircle2, XCircle } from 'lucide-react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from '../Common/StateComponents'

const AcceptTask = ({ data }) => {
  const { userData, setUserData } = useContext(AuthContext)
  const { showToast } = useToast()

  const handleUpdateStatus = (newStatus) => {
    const loggedInUserStr = localStorage.getItem('loggedInUser')
    if (!loggedInUserStr) return

    const loggedInUser = JSON.parse(loggedInUserStr)
    const empEmail = loggedInUser.data?.email

    const updatedEmployees = userData.employee.map((emp) => {
      if (emp.email === empEmail) {
        const updatedTasks = emp.tasks.map((t) => {
          if (t.taskTitle === data.taskTitle && t.taskDate === data.taskDate && t.active) {
            return {
              ...t,
              active: false,
              completed: newStatus === 'completed',
              failed: newStatus === 'failed'
            }
          }
          return t
        })

        const updatedTaskNumber = {
          ...emp.taskNumber,
          active: Math.max(0, (emp.taskNumber?.active || 1) - 1),
          completed: newStatus === 'completed' ? (emp.taskNumber?.completed || 0) + 1 : emp.taskNumber?.completed || 0,
          failed: newStatus === 'failed' ? (emp.taskNumber?.failed || 0) + 1 : emp.taskNumber?.failed || 0
        }

        const updatedEmp = { ...emp, tasks: updatedTasks, taskNumber: updatedTaskNumber }
        localStorage.setItem('loggedInUser', JSON.stringify({ ...loggedInUser, data: updatedEmp }))
        return updatedEmp
      }
      return emp
    })

    setUserData({ ...userData, employee: updatedEmployees })
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))

    if (newStatus === 'completed') {
      showToast(`Task completed: "${data.taskTitle}"`, 'success')
    } else {
      showToast(`Task marked as failed: "${data.taskTitle}"`, 'error')
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[230px]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md text-xs font-medium">
            {data.category}
          </span>
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1">
            <PlayCircle className="w-3 h-3 text-amber-600" />
            In Progress
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 leading-snug">{data.taskTitle}</h3>
        <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
          {data.taskDescription}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Due: {data.taskDate}</span>
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