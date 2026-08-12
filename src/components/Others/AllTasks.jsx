import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Users, Search, UserX, SearchX } from 'lucide-react'
import { EmptyState } from '../Common/StateComponents'

const AllTasks = () => {
  const { userData } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  if (!userData?.employee || userData.employee.length === 0) {
    return (
      <div className="mt-6">
        <EmptyState
          icon={UserX}
          title="No employees found"
          description="There are currently no employee records registered in the system."
        />
      </div>
    )
  }

  const filteredEmployees = userData.employee.filter((emp) => {
    const matchesSearch = emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (emp.email && emp.email.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (!matchesSearch) return false

    if (statusFilter === 'active') {
      return (emp.taskNumber?.active || 0) > 0
    }
    if (statusFilter === 'pending') {
      return (emp.taskNumber?.newTask || 0) > 0
    }
    if (statusFilter === 'available') {
      return (emp.taskNumber?.active || 0) === 0 && (emp.taskNumber?.newTask || 0) === 0
    }
    return true
  })

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-xs mt-4 sm:mt-6 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">Employee Directory & Work Overview</h2>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
            {userData.employee.length}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employee..."
              className="bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:focus:ring-emerald-950 rounded-xl py-2 sm:py-1.5 pl-9 pr-3 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all w-full sm:w-56"
            />
          </div>

          <div className="flex items-center justify-around sm:justify-start gap-1 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                statusFilter === 'active'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer text-center ${
                statusFilter === 'pending'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No search results"
          description={
            searchTerm
              ? `No employees match "${searchTerm}".`
              : "No employees match the selected filter."
          }
          actionLabel="Reset search & filters"
          onAction={() => {
            setSearchTerm('')
            setStatusFilter('all')
          }}
          className="border-dashed bg-slate-50/50 dark:bg-slate-900/50"
        />
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40">
                <th className="py-3 px-4 rounded-l-lg">Employee</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">New Tasks</th>
                <th className="py-3 px-4">Active Tasks</th>
                <th className="py-3 px-4">Completed</th>
                <th className="py-3 px-4 rounded-r-lg">Failed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredEmployees.map((elem, idx) => {
                const activeCount = elem.taskNumber?.active || 0
                const pendingCount = elem.taskNumber?.newTask || 0

                let statusBadge = (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Available
                  </span>
                )

                if (activeCount > 0) {
                  statusBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
                      In Work
                    </span>
                  )
                } else if (pendingCount > 0) {
                  statusBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                      Assigned
                    </span>
                  )
                }

                return (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                          {elem.firstName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">{elem.firstName}</span>
                          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{elem.email || `${elem.firstName.toLowerCase()}@workhive.com`}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">{statusBadge}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                        {elem.taskNumber?.newTask || 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
                        {elem.taskNumber?.active || 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
                        {elem.taskNumber?.completed || 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60">
                        {elem.taskNumber?.failed || 0}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AllTasks