import React, { useContext, useMemo, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Users, Search, UserX, SearchX, Pencil, Trash2 } from 'lucide-react'
import { EmptyState, useToast } from '../Common/StateComponents'
import { getTaskStats, persistEmployees } from '../../utils/localStorage'

const emptyTaskForm = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  category: '',
  employeeId: '',
}

const AllTasks = () => {
  const { userData, setUserData } = useContext(AuthContext)
  const { showToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)
  const [taskForm, setTaskForm] = useState(emptyTaskForm)

  const allEmployees = useMemo(() => userData?.employee || [], [userData])

  const filteredEmployees = allEmployees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()))

    if (!matchesSearch) return false

    const stats = getTaskStats(emp.tasks || [])

    if (statusFilter === 'active') {
      return stats.pending > 0
    }
    if (statusFilter === 'pending') {
      return stats.total > 0
    }
    if (statusFilter === 'available') {
      return stats.total === 0
    }
    return true
  })

  const handleDeleteTask = (employeeId, taskId) => {
    const task = (userData?.employee || []).find((emp) => String(emp.id) === String(employeeId))?.tasks?.find((item) => item.id === taskId)
    if (!task) return

    const confirmed = window.confirm(`Delete task "${task.title}" from this employee?`)
    if (!confirmed) return

    const updatedEmployees = (userData?.employee || []).map((emp) => {
      if (String(emp.id) !== String(employeeId)) return emp
      return { ...emp, tasks: (emp.tasks || []).filter((item) => item.id !== taskId) }
    })

    const persistedEmployees = persistEmployees(updatedEmployees)
    setUserData({ ...userData, employee: persistedEmployees })
    showToast('Task deleted successfully.', 'info')
  }

  const handleEditOpen = (employeeId, task) => {
    setEditingTask({ employeeId, task })
    setTaskForm({
      title: task.title || '',
      description: task.description || '',
      dueDate: task.dueDate || '',
      priority: task.priority || 'medium',
      category: task.category || '',
      employeeId: String(employeeId),
    })
  }

  const handleEditSave = () => {
    if (!editingTask || !taskForm.title.trim() || !taskForm.description.trim() || !taskForm.employeeId) {
      showToast('Please fill all task fields before saving.', 'error')
      return
    }

    const newEmployeeId = String(taskForm.employeeId)
    const targetEmployee = allEmployees.find((emp) => String(emp.id) === newEmployeeId)
    if (!targetEmployee) {
      showToast('Selected employee is invalid.', 'error')
      return
    }

    const updatedEmployees = (userData?.employee || []).map((emp) => {
      const existingTasks = emp.tasks || []

      if (String(emp.id) === String(editingTask.employeeId)) {
        return {
          ...emp,
          tasks: existingTasks.filter((task) => task.id !== editingTask.task.id),
        }
      }

      if (String(emp.id) === newEmployeeId) {
        return {
          ...emp,
          tasks: [
            ...existingTasks,
            {
              ...editingTask.task,
              employeeId: Number(newEmployeeId),
              title: taskForm.title.trim(),
              description: taskForm.description.trim(),
              dueDate: taskForm.dueDate,
              priority: taskForm.priority,
              category: taskForm.category.trim() || 'General',
              updatedAt: new Date().toISOString(),
            },
          ],
        }
      }

      return emp
    })

    const persistedEmployees = persistEmployees(updatedEmployees)
    setUserData({ ...userData, employee: persistedEmployees })
    setEditingTask(null)
    setTaskForm(emptyTaskForm)
    showToast('Task updated successfully.', 'success')
  }

  if (!userData?.employee || userData.employee.length === 0) {
    return (
      <div className="mt-6">
        <EmptyState
          icon={UserX}
          title="No employees found"
          description="There are currently no employee records registered in the system."
        />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-xs mt-4 sm:mt-6 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">Employee Directory & Work Overview</h2>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
            {allEmployees.length}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employee..."
              className="bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl py-2 sm:py-1.5 pl-9 pr-3 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all w-full sm:w-56"
            />
          </div>

          <div className="flex items-center justify-around sm:justify-start gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                statusFilter === 'active'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                statusFilter === 'pending'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No search results"
          description={
            searchTerm
              ? `No employees match "${searchTerm}".`
              : 'No employees match the selected filter.'
          }
          actionLabel="Reset search & filters"
          onAction={() => {
            setSearchTerm('')
            setStatusFilter('all')
          }}
          className="border-dashed bg-slate-50/50 dark:bg-slate-900/50"
        />
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40">
                <th className="py-3 px-4 rounded-l-lg">Employee</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Pending</th>
                <th className="py-3 px-4">Completed</th>
                <th className="py-3 px-4">Failed</th>
                <th className="py-3 px-4 rounded-r-lg">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredEmployees.map((elem, idx) => {
                const stats = getTaskStats(elem.tasks || [])
                const totalTasks = stats.total

                let statusBadge = (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Available
                  </span>
                )

                if (stats.pending > 0) {
                  statusBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
                      In Work
                    </span>
                  )
                }

                return (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                          {elem.firstName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">{elem.firstName}</span>
                          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{elem.email || `${elem.firstName.toLowerCase()}@workhive.com`}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">{statusBadge}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                        {stats.pending}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
                        {stats.completed}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60">
                        {stats.failed}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {totalTasks}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Task Management</h3>
        <div className="space-y-4">
          {allEmployees.map((employee) => (
            <div key={employee.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-[11px] font-bold">
                    {employee.firstName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{employee.firstName}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{employee.email}</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wide bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                  {employee.tasks?.length || 0} tasks
                </span>
              </div>

              {(employee.tasks || []).length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">No tasks assigned yet.</p>
              ) : (
                <div className="space-y-2">
                  {(employee.tasks || []).map((task) => (
                    <div key={task.id} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{task.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditOpen(employee.id, task)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] font-medium hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTask(employee.id, task.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-[11px] font-medium hover:bg-red-100 dark:hover:bg-red-900/60 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Status: {task.status}</span>
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Priority: {task.priority}</span>
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Due: {task.dueDate || 'No date'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Edit Task</h3>
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Title</label>
                <input
                  value={taskForm.title}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 h-24 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Due Date</label>
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Priority</label>
                <select
                  value={taskForm.priority}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, priority: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Assigned Employee</label>
                <select
                  value={taskForm.employeeId}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, employeeId: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100"
                >
                  {allEmployees.map((employee) => (
                    <option key={employee.id} value={String(employee.id)}>{employee.firstName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                <input
                  value={taskForm.category}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditSave}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium cursor-pointer"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllTasks