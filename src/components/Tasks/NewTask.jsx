import React from 'react'

const NewTask = ({data}) => {
  return (
   <div className='bg-blue-400 h-full w-[300px] rounded-2xl shrink-0 p-4 '>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 px-2 rounded-md font-medium'>{data.category}</h3>
                <h4 className='font-bold text-[14px]'>{data.taskDate}</h4>
            </div>
           <h2 className='mt-5 text-4xl whitespace-nowrap'>{data.taskTitle}</h2> 
           <p className='mt-5 '>
            { data.taskDescription}
            </p>
            <div className='mt-4'>
                <button className='bg-blue-800 px-2 py-1 rounded-md'>Accept Task</button>
            </div>
       </div>

  )
}

export default NewTask