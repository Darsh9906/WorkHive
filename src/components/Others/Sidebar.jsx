import React from 'react'
import { LayoutDashboard, LogOut, BriefcaseBusiness, Shield, UserCheck } from 'lucide-react'

const Sidebar = ({ data, changeUser }) => {
  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    if (changeUser) {
      changeUser('')
    }
  }

  const role = data?.email === 'admin@example.com' || !data?.taskNumber ? 'Admin' : 'Employee'
  const userName = data?.firstName || (role === 'Admin' ? 'Admin' : 'Employee')

  return (
    <aside className="w-64 min-h-screen shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between p-5 select-none">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <BriefcaseBusiness className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-900">WorkHive</span>
            </div>
            <span className="text-xs text-slate-500">Employee Portal</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1">
            Menu
          </span>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 transition-all">
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span>Dashboard</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-slate-50 border border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-slate-900 truncate">
              {userName}
            </span>
            <div className="flex items-center gap-1">
              {role === 'Admin' ? (
                <Shield className="w-3 h-3 text-amber-500" />
              ) : (
                <UserCheck className="w-3 h-3 text-emerald-600" />
              )}
              <span className="text-[11px] text-slate-500 capitalize">{role}</span>
            </div>
          </div>
        </div>

        <button
          onClick={logOutUser}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
