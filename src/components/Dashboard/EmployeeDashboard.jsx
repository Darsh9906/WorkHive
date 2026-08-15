import React, { useState } from 'react'
import Header from '../Others/Header'
import TaskListNumber from '../Others/TaskListNumber'
import TaskList from '../Tasks/TaskList'
import Sidebar from '../Others/Sidebar'
import { EmptyState } from '../Common/StateComponents'
import { CheckCircle2, XCircle, ClipboardList } from 'lucide-react'

const EmployeeDashboard = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const tasks = Array.isArray(props.data?.tasks) ? props.data.tasks : []
  const completedTasks = tasks.filter((task) => task?.status === 'completed')
  const failedTasks = tasks.filter((task) => task?.status === 'failed')

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar
        data={props.data}
        changeUser={props.changeUser}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-6 md:p-8 max-w-7xl w-full">
        <Header
          data={props.data}
          changeUser={props.changeUser}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <TaskListNumber data={props.data} />
        <TaskList data={props.data} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Completed History</h3>
            </div>

            {completedTasks.length === 0 ? (
              <EmptyState icon={CheckCircle2} title="No completed tasks yet" description="Completed work will appear here after you finish a task." />
            ) : (
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <div key={task.id || task.title} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{task.title}</span>
                      <span className="text-[10px] uppercase tracking-wide bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 px-2 py-0.5 rounded-full">
                        {task.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{task.description || 'No description provided.'}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Priority: {task.priority}</span>
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Due: {task.dueDate || 'No date'}</span>
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Completed: {task.completedAt ? new Date(task.completedAt).toLocaleDateString() : '—'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Failed History</h3>
            </div>

            {failedTasks.length === 0 ? (
              <EmptyState icon={ClipboardList} title="No failed tasks" description="Tasks marked as failed will be tracked here." />
            ) : (
              <div className="space-y-3">
                {failedTasks.map((task) => (
                  <div key={task.id || task.title} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{task.title}</span>
                      <span className="text-[10px] uppercase tracking-wide bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60 px-2 py-0.5 rounded-full">
                        {task.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{task.description || 'No description provided.'}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Priority: {task.priority}</span>
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Due: {task.dueDate || 'No date'}</span>
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">Failed: {task.failedAt ? new Date(task.failedAt).toLocaleDateString() : '—'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default EmployeeDashboard