import React from 'react'
import Header from '../Others/Header'
import TaskListNumber from '../Others/TaskListNumber'
import TaskList from '../Tasks/TaskList'
import Sidebar from '../Others/Sidebar'

const EmployeeDashboard = (props) => {
  return (
    <div className='flex min-h-screen w-full bg-[var(--bg-app)]'>
        <Sidebar data={props.data} changeUser={props.changeUser} />
        <div className='flex-1 p-10 min-h-screen overflow-y-auto'>
            <Header data={props.data} changeUser={props.changeUser}/>
            <TaskListNumber data={props.data} />
            <TaskList data={props.data}/>
        </div>
    </div>
  )
}

export default EmployeeDashboard