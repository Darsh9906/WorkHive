import React from 'react'

const FailedTask = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="flex justify-between items-center gap-2">
          <span className="bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-md text-xs font-semibold">
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
        <div className="w-full bg-red-50 text-red-700 border border-red-200 py-1.5 px-3 rounded-lg text-xs font-medium text-center">
          Failed
        </div>
      </div>
    </div>
  )
}

export default FailedTask