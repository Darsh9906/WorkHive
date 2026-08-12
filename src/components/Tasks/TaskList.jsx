import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { ClipboardList } from 'lucide-react'
import { EmptyState } from '../Common/StateComponents'

const TaskList = ({ data }) => {
  if (!data?.tasks || data.tasks.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          icon={ClipboardList}
          title="No tasks yet"
          description="Tasks assigned to you will appear here."
        />
      </div>
    )
  }

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Your Tasks</h2>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
            {data.tasks.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {data.tasks.map((elem, idx) => {
          if (elem.active) {
            return <AcceptTask key={idx} data={elem} />
          }
          if (elem.newTask) {
            return <NewTask key={idx} data={elem} />
          }
          if (elem.completed) {
            return <CompleteTask key={idx} data={elem} />
          }
          if (elem.failed) {
            return <FailedTask key={idx} data={elem} />
          }
          return null
        })}
      </div>
    </div>
  )
}

export default TaskList