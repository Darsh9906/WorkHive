import React from 'react'
import Header from '../EmployeeDashboard/Header'
import TaskListNumber from '../EmployeeDashboard/TaskListNumber'
import TaskList from '../Tasks/TaskList'

const EmployeeDashboard = () => {
  return (
    <div className='p-10 bg-[#1c1c1c] h-screen'>
        <Header />
        <TaskListNumber />
        <TaskList />
    </div>
  )
}

export default EmployeeDashboard          