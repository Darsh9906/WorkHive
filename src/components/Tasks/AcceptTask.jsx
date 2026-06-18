import React from 'react'

const AcceptTask = ({data}) => {
    console.log(data);
    
  return (
   <div className='bg-yellow-400 h-full w-[300px] rounded-2xl shrink-0 p-4 text-black'>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 px-2 rounded-md font-medium text-white'>{data.category}</h3>
                <h4 className='font-bold text-[14px] text-white'>{data.taskDate}</h4>
            </div>
           <h2 className='mt-5 font-medium text-[26px] whitespace-nowrap '>{data.taskTitle}</h2> 
           <p className='mt-5 '>
           { data.taskDescription}
            </p>
            <div className='flex justify-between mt-4'>
                <button className='bg-green-500 py-1 px-2 text-sm text-white'>Mark as Completed</button>
                <button className='bg-red-800 py-1 px-2 text-sm text-white'>Mark as Failed</button>
            </div>
       </div>
  )
}

export default AcceptTask