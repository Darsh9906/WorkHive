import React from 'react'
import Header from '../Others/Header'
import CreateTask from '../Others/CreateTask'
import AllTasks from '../Others/AllTasks'
import Sidebar from '../Others/Sidebar'

const AdminDashboard = (props) => {
    return (
        <div className='flex min-h-screen w-full bg-[var(--bg-app)]'>
            <Sidebar data={props.data} changeUser={props.changeUser} />
            <div className='flex-1 px-7 py-4 min-h-screen w-full overflow-y-auto'>
                <Header data={props.data} changeUser={props.changeUser} />
                
                <CreateTask />

                <AllTasks />
            </div>
        </div>
    )
}

export default AdminDashboard