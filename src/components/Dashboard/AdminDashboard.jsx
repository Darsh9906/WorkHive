import React, { useContext, useState } from 'react'
import Header from '../Others/Header'
import CreateTask from '../Others/CreateTask'
import AllTasks from '../Others/AllTasks'
import Sidebar from '../Others/Sidebar'
import { AuthContext } from '../../context/AuthProvider'
import { getTaskStats } from '../../utils/localStorage'
import { Users, Clock, CheckCircle2, AlertTriangle, Inbox } from 'lucide-react'

const AdminDashboard = (props) => {
  const { userData } = useContext(AuthContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const allTasks = (userData?.employee || []).flatMap((emp) => emp.tasks || [])
  const totals = getTaskStats(allTasks)
  const totalEmployees = userData?.employee?.length || 0

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar
        data={props.data}
        changeUser={props.changeUser}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-6 md:p-8 max-w-7xl w-full">
        <Header
          data={props.data}
          changeUser={props.changeUser}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mt-4 sm:mt-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Employees</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalEmployees}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active team members</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Tasks</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totals.total}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">All assigned work</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totals.pending}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">In-progress work</p>
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
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totals.completed}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Finished tasks</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Failed</span>
              <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totals.failed}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Unresolved tasks</p>
            </div>
          </div>
        </div>

        <CreateTask />
        <AllTasks />
      </main>
    </div>
  )
}

export default AdminDashboard