import React from 'react'

const FailedTask = () => {
  return (
     <div className='bg-yellow-400 h-full w-[300px] rounded-2xl shrink-0 p-4 '>
            
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-700 px-2 rounded-md font-medium'>High</h3>
                <h4 className='font-bold text-[14px]'>20 Feb 2024</h4>
            </div>
           <h2 className='mt-5 text-4xl whitespace-nowrap'>Ek aur Task</h2> 
           <p className='mt-5 '>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, eius.
            </p>
            <div className='mt-2'>
                <button className='w-full bg-red-500 py-1 rounded-md'>Failed</button>
            </div>
       </div>
  )
}

export default FailedTask