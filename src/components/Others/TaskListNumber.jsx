import React from 'react'
import { AlertCircle, CheckCircle2, Clock, Inbox } from 'lucide-react'
import { getTaskStats } from '../../utils/localStorage'

const TaskListNumber = ({ data }) => {
  const stats = getTaskStats(data?.tasks || [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Tasks</span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Inbox className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.total}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">All assigned work</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Tasks</span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.pending}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Currently active</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.completed}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Finished deliverables</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Failed</span>
          <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.failed}</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Unresolved issues</p>
        </div>
      </div>
    </div>
  )
}

export default TaskListNumber