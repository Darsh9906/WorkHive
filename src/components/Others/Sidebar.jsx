import React from 'react'
import { LayoutDashboard, LogOut, Hexagon, Shield, UserCheck } from 'lucide-react'

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
    <aside className="w-64 min-h-screen shrink-0 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] flex flex-col justify-between p-4 select-none">
      {/* Top Section: Brand & Navigation */}
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Hexagon className="w-5 h-5 fill-indigo-500/20 text-indigo-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-[var(--text-primary)]">WorkHive</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                PRO
              </span>
            </div>
            <span className="text-xs text-[var(--text-muted)]">Workspace Portal</span>
          </div>
        </div>

        {/* Navigation Group */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] px-3 mb-1">
            Workspace
          </span>

          {/* Active Navigation Item */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium bg-[var(--bg-elevated)] text-[var(--text-primary)] border-l-2 border-[var(--accent-primary)] shadow-sm transition-all">
            <LayoutDashboard className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Dashboard</span>
            <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: User Profile & Actions */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col gap-3">
        {/* User Card */}
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-[#18181b]/50 border border-zinc-800/40">
          <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-medium text-[var(--text-primary)] truncate">
              {userName}
            </span>
            <div className="flex items-center gap-1">
              {role === 'Admin' ? (
                <Shield className="w-3 h-3 text-amber-400" />
              ) : (
                <UserCheck className="w-3 h-3 text-emerald-400" />
              )}
              <span className="text-xs text-[var(--text-muted)] capitalize">{role}</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logOutUser}
          className="wh-btn wh-btn-ghost w-full justify-start text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 px-3 py-2 text-xs transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
