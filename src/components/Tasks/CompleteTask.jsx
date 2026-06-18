import React from 'react'

const CompleteTask = ({data}) => {
  return (
     <div className='bg-green-400 h-full w-[300px] rounded-2xl shrink-0 p-4 '>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 px-2 rounded-md font-medium'>{data.category}</h3>
                <h4 className='font-bold text-[14px]'>{data.taskDate}</h4>
            </div>
           <h2 className='mt-5 text-4xl whitespace-nowrap'>{data.taskTitle}</h2> 
           <p className='mt-5 '>
            { data.taskDescription}
            </p>
            <div className='mt-2'>
                <button className='w-full bg-green-700 py-1 rounded-md'>Completed</button>
            </div>
       </div>
  )
}

export default CompleteTask