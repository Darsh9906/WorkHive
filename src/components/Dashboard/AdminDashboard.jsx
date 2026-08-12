import React, { useContext } from 'react'
import Header from '../Others/Header'
import CreateTask from '../Others/CreateTask'
import AllTasks from '../Others/AllTasks'
import Sidebar from '../Others/Sidebar'
import { AuthContext } from '../../context/AuthProvider'
import { Users, Clock, CheckCircle2, Inbox } from 'lucide-react'

const AdminDashboard = (props) => {
  const { userData } = useContext(AuthContext)

  const totalEmployees = userData?.employee?.length || 0
  const totalNew = userData?.employee?.reduce((acc, emp) => acc + (emp.taskNumber?.newTask || 0), 0) || 0
  const totalActive = userData?.employee?.reduce((acc, emp) => acc + (emp.taskNumber?.active || 0), 0) || 0
  const totalCompleted = userData?.employee?.reduce((acc, emp) => acc + (emp.taskNumber?.completed || 0), 0) || 0

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Sidebar data={props.data} changeUser={props.changeUser} />
      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-8 max-w-7xl">
        <Header data={props.data} changeUser={props.changeUser} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Employees</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalEmployees}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Active team members</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">New Tasks</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalNew}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pending employee pickup</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Tasks</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalActive}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">In-progress deliverables</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalCompleted}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Finished tasks</p>
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