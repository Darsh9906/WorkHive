import React from 'react'
import Header from '../Others/Header'
import CreateTask from '../Others/CreateTask'
import AllTasks from '../Others/AllTasks'

const AdminDashboard = (props) => {


    return (
        <div className='px-7 py-4 min-h-screen w-full'>
            <Header data={props.data} changeUser={props.changeUser} />
            
            <CreateTask />

            <AllTasks />
        </div>
    )
}

export default AdminDashboard