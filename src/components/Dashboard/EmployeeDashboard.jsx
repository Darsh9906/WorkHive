import React from 'react'
import Header from '../Others/Header'
import TaskListNumber from '../Others/TaskListNumber'
import TaskList from '../Tasks/TaskList'
import Sidebar from '../Others/Sidebar'

const EmployeeDashboard = (props) => {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <Sidebar data={props.data} changeUser={props.changeUser} />
      <main className="flex-1 p-6 md:p-8 min-h-screen overflow-y-auto max-w-7xl">
        <Header data={props.data} changeUser={props.changeUser} />
        <TaskListNumber data={props.data} />
        <TaskList data={props.data} />
      </main>
    </div>
  )
}

export default EmployeeDashboard