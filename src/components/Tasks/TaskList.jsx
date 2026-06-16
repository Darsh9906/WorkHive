import React from 'react'

const TaskList = ({data}) => {
    

  return (
    <div className='h-[55%] flex-nowrap flex justify-start gap-4 items-center w-full mt-10 p-5 overflow-x-auto scrollbar-none'>
       
       <div className='bg-red-400 h-full w-[300px] rounded-2xl shrink-0 p-4 '>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 px-2 rounded-md font-medium'>High</h3>
                <h4 className='font-bold text-[14px]'>20 Feb 2024</h4>
            </div>
           <h2 className='mt-5 text-4xl whitespace-nowrap'>Ek aur Task</h2> 
           <p className='mt-5 '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, eius.
            </p>
       </div>

       <div className='bg-green-400 h-full w-[300px] rounded-2xl shrink-0 p-4 '>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 px-2 rounded-md font-medium'>High</h3>
                <h4 className='font-bold text-[14px]'>20 Feb 2024</h4>
            </div>
           <h2 className='mt-5 text-4xl whitespace-nowrap'>Ek aur Task</h2> 
           <p className='mt-5 '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, eius.
            </p>
       </div>

       <div className='bg-blue-400 h-full w-[300px] rounded-2xl shrink-0 p-4 '>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 px-2 rounded-md font-medium'>High</h3>
                <h4 className='font-bold text-[14px]'>20 Feb 2024</h4>
            </div>
           <h2 className='mt-5 text-4xl whitespace-nowrap'>Ek aur Task</h2> 
           <p className='mt-5 '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, eius.
            </p>
       </div>

       <div className='bg-yellow-400 h-full w-[300px] rounded-2xl shrink-0 p-4 '>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 px-2 rounded-md font-medium'>High</h3>
                <h4 className='font-bold text-[14px]'>20 Feb 2024</h4>
            </div>
           <h2 className='mt-5 text-4xl whitespace-nowrap'>Ek aur Task</h2> 
           <p className='mt-5 '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, eius.
            </p>
       </div>
      
      <div className='bg-red-400 h-full w-[300px] rounded-2xl shrink-0 p-4 '>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 px-2 rounded-md font-medium'>High</h3>
                <h4 className='font-bold text-[14px]'>20 Feb 2024</h4>
            </div>
           <h2 className='mt-5 text-4xl whitespace-nowrap'>Ek aur Task</h2> 
           <p className='mt-5 '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, eius.
            </p>
       </div>

    </div>
  )
}

export default TaskList