import React from 'react'
import AcceptTask from './AcceptTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { ClipboardList } from 'lucide-react'
import { EmptyState } from '../Common/StateComponents'

const TaskList = ({ data }) => {
  const tasks = Array.isArray(data?.tasks) ? data.tasks : []
  const activeTasks = tasks.filter((task) => task?.status === 'pending')

  if (activeTasks.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          icon={ClipboardList}
          title="No active tasks"
          description="Your pending assignments will appear here."
        />
      </div>
    )
  }

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Active Tasks</h2>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
            {activeTasks.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {activeTasks.map((elem) => (
          <AcceptTask key={elem.id || `${elem.title}-${elem.dueDate}`} data={elem} />
        ))}
      </div>
    </div>
  )
}

export default TaskList