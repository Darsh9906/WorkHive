import React from 'react'
import Header from '../Others/Header'
import TaskListNumber from '../Others/TaskListNumber'
import TaskList from '../Tasks/TaskList'

const EmployeeDashboard = (props) => {
  
    
  return (
    <div className='p-10 bg-[#1c1c1c] h-screen'>
        <Header data={props.data} changeUser={props.changeUser}/>
        <TaskListNumber data={props.data} />
        <TaskList data={props.data}/>
    </div>
  )
}

export default EmployeeDashboard          