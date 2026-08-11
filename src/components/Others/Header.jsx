import React from 'react'
import { ShieldCheck, UserCheck } from 'lucide-react'

const Header = (props) => {  
  const role = props.data?.email === 'admin@example.com' || !props.data?.taskNumber ? 'Admin' : 'Employee'
  const userName = props.data?.firstName || (role === 'Admin' ? 'Admin' : 'Employee')

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{role} Dashboard</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, <span className="text-blue-600">{userName}</span>
        </h1>
        <p className="text-xs text-slate-500">
          {role === 'Admin' 
            ? 'Manage employee task allocations and view workspace metrics.' 
            : 'Track your assigned tasks, current work progress, and completed deliverables.'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-900 leading-tight">
              {userName}
            </span>
            <div className="flex items-center gap-0.5">
              {role === 'Admin' ? (
                <ShieldCheck className="w-3 h-3 text-amber-500" />
              ) : (
                <UserCheck className="w-3 h-3 text-emerald-600" />
              )}
              <span className="text-[10px] text-slate-500 leading-tight">{role}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
