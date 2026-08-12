import React from 'react'
import { LayoutDashboard, LogOut, BriefcaseBusiness, ShieldUser, CircleUserRound, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const Sidebar = ({ data, changeUser }) => {
  const { theme, toggleTheme } = useTheme()

  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    if (changeUser) {
      changeUser('')
    }
  }

  const role = data?.email === 'admin@example.com' || !data?.taskNumber ? 'Admin' : 'Employee'
  const userName = data?.firstName || (role === 'Admin' ? 'Admin' : 'Employee')

  return (
    <aside className="w-64 h-screen shrink-0 sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-5 select-none z-20 transition-colors">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <BriefcaseBusiness className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">WorkHive</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Workspace Portal</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-1">
            Menu
          </span>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40 transition-all">
            <LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Dashboard</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
              {userName}
            </span>
            <div className="flex items-center gap-0.5">
              {role === 'Admin' ? (
                <ShieldUser className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <CircleUserRound className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              )}
              <span className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">{role}</span>
            </div>
          </div>
        </div>

        <button
          onClick={logOutUser}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl border border-transparent hover:border-red-100 dark:hover:border-red-900/40 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
