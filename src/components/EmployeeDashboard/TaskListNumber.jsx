import React from 'react'

const TaskListNumber = () => {
  return (
    <div className='flex justify-between mt-10 gap-5 '>
        <div className='bg-red-400 flex-1 rounded-xl px-8 py-5 hover:scale-105'>
            <h2 className='font-bold text-2xl'>0</h2>
            <h3  className='font-medium text-2xl'>New Task</h3>
        </div>

        <div className='bg-blue-400 flex-1 rounded-xl px-8 py-5 hover:scale-105'>
            <h2 className='font-bold text-2xl'>0</h2>
            <h3  className='font-medium text-2xl'>New Task</h3>
        </div> 

        <div className='bg-yellow-400 flex-1 rounded-xl px-8 py-5 hover:scale-105'>
            <h2 className='font-bold text-2xl'>0</h2>
            <h3  className='font-medium text-2xl'>New Task</h3>
        </div>

        <div className='bg-green-400 flex-1 rounded-xl px-8 py-5 hover:scale-105'>
            <h2 className='font-bold text-2xl'>0</h2>
            <h3  className='font-medium text-2xl'>New Task</h3>
        </div>
    
    </div>
  )
}

export default TaskListNumber