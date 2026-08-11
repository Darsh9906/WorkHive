import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { ClipboardList } from 'lucide-react'

const TaskList = ({ data }) => {
  if (!data?.tasks || data.tasks.length === 0) {
    return (
      <div className="mt-8 p-10 text-center bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">No Tasks Assigned</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          You currently have no tasks assigned. New tasks will appear here when created by your administrator.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900">Your Tasks</h2>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            {data.tasks.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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