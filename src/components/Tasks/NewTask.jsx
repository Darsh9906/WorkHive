import React, { useContext } from 'react'
import { Calendar, Clock, CheckCircle } from 'lucide-react'
import { AuthContext } from '../../context/AuthProvider'
import { useToast } from '../Common/StateComponents'

const NewTask = ({ data }) => {
  const { userData, setUserData } = useContext(AuthContext)
  const { showToast } = useToast()

  const handleAcceptTask = () => {
    const loggedInUserStr = localStorage.getItem('loggedInUser')
    if (!loggedInUserStr) return

    const loggedInUser = JSON.parse(loggedInUserStr)
    const empEmail = loggedInUser.data?.email

    const updatedEmployees = userData.employee.map((emp) => {
      if (emp.email === empEmail) {
        const updatedTasks = emp.tasks.map((t) => {
          if (t.taskTitle === data.taskTitle && t.taskDate === data.taskDate && t.newTask) {
            return { ...t, newTask: false, active: true }
          }
          return t
        })
        const updatedTaskNumber = {
          ...emp.taskNumber,
          newTask: Math.max(0, (emp.taskNumber?.newTask || 1) - 1),
          active: (emp.taskNumber?.active || 0) + 1
        }
        const updatedEmp = { ...emp, tasks: updatedTasks, taskNumber: updatedTaskNumber }
        localStorage.setItem('loggedInUser', JSON.stringify({ ...loggedInUser, data: updatedEmp }))
        return updatedEmp
      }
      return emp
    })

    setUserData({ ...userData, employee: updatedEmployees })
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))
    showToast(`Accepted task: "${data.taskTitle}"`, 'info')
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[230px]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md text-xs font-medium">
            {data.category}
          </span>
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-600" />
            Pending
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

        <button
          onClick={handleAcceptTask}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Accept Task</span>
        </button>
      </div>
    </div>
  )
}

export default NewTask