import React from 'react'
import Header from '../EmployeeDashboard/Header'
import CreateTask from '../EmployeeDashboard/CreateTask'
import AllTasks from '../EmployeeDashboard/AllTasks'

const AdminDashboard = ({data}) => {


    return (
        <div className='px-7 py-4 min-h-screen w-full'>
            <Header data={data}/>
            
            <CreateTask />

            <AllTasks />
        </div>
    )
}

export default AdminDashboard