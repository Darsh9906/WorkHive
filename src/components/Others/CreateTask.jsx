import React, { useContext, useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {
  const { userData, setUserData } = useContext(AuthContext)

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [asignTo, setAsignTo] = useState('')
  const [category, setCategory] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    const task = {
      taskDate,
      taskDescription,
      category,
      taskTitle,
      active: false,
      newTask: true,
      completed: false,
      failed: false
    }

    const data = [...userData.employee]

    data.forEach((emp) => {
      if (emp.firstName.toLowerCase() === asignTo.toLowerCase()) {
        emp.tasks.push(task)
        if (emp.taskNumber) {
          emp.taskNumber.newTask = (emp.taskNumber.newTask || 0) + 1
        }
      }
    })

    setUserData({
      ...userData,
      employee: data
    })

    localStorage.setItem('employees', JSON.stringify(data))

    setAsignTo('')
    setCategory('')
    setTaskDate('')
    setTaskDescription('')
    setTaskTitle('')
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs mt-6">
      <div className="flex items-center gap-2 mb-5">
        <PlusCircle className="w-5 h-5 text-blue-600" />
        <h2 className="text-base font-bold text-slate-900">Assign New Task</h2>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Task Title
            </label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              type="text"
              placeholder="e.g. Make a UI design"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Due Date
            </label>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
              type="date"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Assign To (Employee Name)
            </label>
            <input
              value={asignTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              type="text"
              placeholder="e.g. Aarav"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
              type="text"
              placeholder="e.g. Design, Frontend"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1.5">
            Task Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all h-28 resize-none"
            placeholder="Detailed description of the task..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl text-sm transition-colors cursor-pointer shadow-xs"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask