import React from 'react'
import { ShieldCheck, UserCheck, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const Header = (props) => {  
  const { theme, toggleTheme } = useTheme()
  const role = props.data?.email === 'admin@example.com' || !props.data?.taskNumber ? 'Admin' : 'Employee'
  const userName = props.data?.firstName || (role === 'Admin' ? 'Admin' : 'Employee')

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold">{role} Dashboard</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Welcome back, <span className="text-emerald-600 dark:text-emerald-400">{userName}</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {role === 'Admin' 
            ? 'Manage employee task allocations and view workspace metrics.' 
            : 'Track your assigned tasks, current work progress, and completed deliverables.'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-xs transition-all cursor-pointer flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight">
              {userName}
            </span>
            <div className="flex items-center gap-0.5">
              {role === 'Admin' ? (
                <ShieldCheck className="w-3 h-3 text-amber-500" />
              ) : (
                <UserCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              )}
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{role}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
