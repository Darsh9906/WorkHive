import React from 'react'
import { Calendar, CheckCircle2 } from 'lucide-react'

const CompleteTask = ({ data }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[230px]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md text-xs font-medium">
            {data.category}
          </span>
          <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            Completed
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">{data.taskTitle}</h3>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {data.taskDescription}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span>Completed: {data.taskDate}</span>
        </div>

        <div className="w-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 py-1.5 px-3 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Task Finished</span>
        </div>
      </div>
    </div>
  )
}

export default CompleteTask