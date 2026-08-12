import React, { useState } from 'react'
import Header from '../Others/Header'
import TaskListNumber from '../Others/TaskListNumber'
import TaskList from '../Tasks/TaskList'
import Sidebar from '../Others/Sidebar'

const EmployeeDashboard = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        <TaskListNumber data={props.data} />
        <TaskList data={props.data} />
      </main>
    </div>
  )
}

export default EmployeeDashboard