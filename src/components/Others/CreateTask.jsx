import React, { useContext, useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { AuthContext } from '../../context/AuthProvider'
import { ErrorState, LoadingSpinner, useToast } from '../Common/StateComponents'
import { persistEmployees } from '../../utils/localStorage'

const CreateTask = () => {
  const { userData, setUserData } = useContext(AuthContext)
  const { showToast } = useToast()

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [assignedEmployeeId, setAssignedEmployeeId] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('medium')

  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!taskTitle.trim() || !taskDescription.trim() || !taskDate.trim() || !assignedEmployeeId || !category.trim()) {
      setErrorMsg('Please fill in all task details before submitting.')
      return
    }

    const targetEmployee = (userData?.employee || []).find((emp) => String(emp.id) === String(assignedEmployeeId))
    if (!targetEmployee) {
      setErrorMsg('Please select a valid employee for this task.')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const nextEmployees = (userData?.employee || []).map((emp) => {
        if (String(emp.id) !== String(assignedEmployeeId)) return emp

        const task = {
          id: `task-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
          employeeId: emp.id,
          title: taskTitle.trim(),
          description: taskDescription.trim(),
          priority,
          dueDate: taskDate,
          status: 'pending',
          category: category.trim(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          completedAt: null,
          failedAt: null,
        }

        return {
          ...emp,
          tasks: [...(emp.tasks || []), task],
        }
      })

      const persistedEmployees = persistEmployees(nextEmployees)
      setUserData({
        ...userData,
        employee: persistedEmployees,
      })

      showToast(`Task assigned to ${targetEmployee.firstName} successfully!`, 'success')
      setAssignedEmployeeId('')
      setCategory('')
      setPriority('medium')
      setTaskDate('')
      setTaskDescription('')
      setTaskTitle('')
      setIsSubmitting(false)
    }, 250)
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-xs mt-4 sm:mt-6 transition-colors">
      <div className="flex items-center gap-2 mb-4 sm:mb-5">
        <PlusCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Assign New Task</h2>
      </div>

      {errorMsg && <ErrorState title="Task Creation Failed" message={errorMsg} className="mb-5" />}

      <form onSubmit={submitHandler} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Task Title
            </label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all"
              type="text"
              placeholder="e.g. Make a UI design"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Due Date
            </label>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all"
              type="date"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Assign To
            </label>
            <select
              value={assignedEmployeeId}
              onChange={(e) => setAssignedEmployeeId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all"
            >
              <option value="">Select employee</option>
              {(userData?.employee || []).map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition-all"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all"
              type="text"
              placeholder="e.g. Design, Frontend"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Task Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all h-28 resize-none"
            placeholder="Detailed description of the task..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium py-2.5 px-6 rounded-xl text-sm transition-all cursor-pointer shadow-xs disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <LoadingSpinner size="xs" label="Assigning..." />
            ) : (
              <span>Create Task</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask