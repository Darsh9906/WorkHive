import React from 'react'
import { LogOut, User, ShieldCheck, UserCheck, Sparkles } from 'lucide-react'

const Header = (props) => {  
  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '')
    if (props.changeUser) {
      props.changeUser('')
    }
  }

  const role = props.data?.email === 'admin@example.com' || !props.data?.taskNumber ? 'Admin' : 'Employee'
  const userName = props.data?.firstName || (role === 'Admin' ? 'Admin' : 'Employee')

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 pb-6 mb-6 border-b border-[var(--border-subtle)]">
      {/* Left: Breadcrumb & Greeting Title */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-[var(--text-secondary)] font-medium">Overview</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Welcome back, <span className="text-[var(--accent-primary)]">{userName}</span>
          </h1>
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          {role === 'Admin' 
            ? 'Manage employee task allocations and view real-time workspace metrics.' 
            : 'Track your assigned tasks, progress milestones, and daily goals.'}
        </p>
      </div>

      {/* Right: User Profile Widget & Logout Button */}
      <div className="flex items-center gap-3">
        {/* User Pill Badge */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
          <div className="w-7 h-7 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[var(--text-primary)] leading-tight">
              {userName}
            </span>
            <div className="flex items-center gap-1">
              {role === 'Admin' ? (
                <ShieldCheck className="w-3 h-3 text-amber-400" />
              ) : (
                <UserCheck className="w-3 h-3 text-emerald-400" />
              )}
              <span className="text-[10px] text-[var(--text-muted)] leading-tight">{role}</span>
            </div>
          </div>
        </div>

        {/* Log Out Action Button */}
        <button 
          onClick={logOutUser}
          className="wh-btn wh-btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 text-zinc-300 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all cursor-pointer"
          title="Sign out of WorkHive"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log out</span>
        </button>
      </div>
    </header>
  )
}

export default Header

