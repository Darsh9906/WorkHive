import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
  if (!data?.tasks || data.tasks.length === 0) {
    return (
      <div className="mt-8 p-8 text-center bg-white border border-slate-200 rounded-xl">
        <p className="text-sm text-slate-500">No tasks assigned yet.</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-900">Your Tasks</h2>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {data.tasks.length} {data.tasks.length === 1 ? 'task' : 'tasks'}
        </span>
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