import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Users } from 'lucide-react'

const AllTasks = () => {
  const { userData } = useContext(AuthContext)

  if (!userData?.employee || userData.employee.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs mt-6 text-center text-xs text-slate-500">
        No employee records available.
      </div>
    )
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs mt-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Employee Overview</h2>
        </div>
        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
          {userData.employee.length} Employees
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50">
              <th className="py-3 px-4 rounded-l-lg">Employee</th>
              <th className="py-3 px-4">New Tasks</th>
              <th className="py-3 px-4">Active Tasks</th>
              <th className="py-3 px-4">Completed</th>
              <th className="py-3 px-4 rounded-r-lg">Failed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {userData.employee.map((elem, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      {elem.firstName.charAt(0).toUpperCase()}
                    </div>
                    <span>{elem.firstName}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {elem.taskNumber?.newTask || 0}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    {elem.taskNumber?.active || 0}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {elem.taskNumber?.completed || 0}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                    {elem.taskNumber?.failed || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllTasks