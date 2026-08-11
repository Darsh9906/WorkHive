import React from 'react'

const AcceptTask = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="flex justify-between items-center gap-2">
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-md text-xs font-semibold">
            {data.category}
          </span>
          <span className="text-xs font-mono text-slate-400">{data.taskDate}</span>
        </div>
        <h3 className="mt-3 text-base font-semibold text-slate-900">{data.taskTitle}</h3>
        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
          {data.taskDescription}
        </p>
      </div>

      <div className="flex gap-2 mt-5 pt-3 border-t border-slate-100">
        <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer">
          Mark as Completed
        </button>
        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer">
          Mark as Failed
        </button>
      </div>
    </div>
  )
}

export default AcceptTask