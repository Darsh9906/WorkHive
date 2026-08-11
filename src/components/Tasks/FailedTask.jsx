import React from 'react'
import { Calendar, AlertCircle } from 'lucide-react'

const FailedTask = ({ data }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[230px]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md text-xs font-medium">
            {data.category}
          </span>
          <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-red-600" />
            Failed
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 leading-snug">{data.taskTitle}</h3>
        <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
          {data.taskDescription}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Date: {data.taskDate}</span>
        </div>

        <div className="w-full bg-red-50 text-red-700 border border-red-200 py-1.5 px-3 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-red-600" />
          <span>Task Unresolved</span>
        </div>
      </div>
    </div>
  )
}

export default FailedTask