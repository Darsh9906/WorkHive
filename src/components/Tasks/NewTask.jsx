import React from 'react'

const NewTask = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="flex justify-between items-center gap-2">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-md text-xs font-semibold">
            {data.category}
          </span>
          <span className="text-xs font-mono text-slate-400">{data.taskDate}</span>
        </div>
        <h3 className="mt-3 text-base font-semibold text-slate-900">{data.taskTitle}</h3>
        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
          {data.taskDescription}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer">
          Accept Task
        </button>
      </div>
    </div>
  )
}

export default NewTask