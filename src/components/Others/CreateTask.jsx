import React from 'react'
import { PlusCircle  } from 'lucide-react'


const CreateTask = () => {
  return (
      <div >
                <form className='flex justify-between mt-6 bg-[#212121] p-4 gap-10'>
                        
                        <div className='w-1/2'>
                            <div >
                                <h3 className='font-medium text-gray-300'>Task Title</h3>
                                <input className='bg-[#333] p-2 w-full mt-2 rounded-md outline-none' type="text" placeholder='Make a UI design' />
                            </div>

                            <div className='mt-3'>
                                <h3 className='font-medium text-gray-300'>Date</h3>
                                <input className='bg-[#333] p-2 w-full mt-2 rounded-md outline-none' type="date" />
                            </div>

                            <div className='mt-3'>
                                <h3 className='font-medium text-gray-300'>Assign To</h3>
                                <input className='bg-[#333] p-2 w-full mt-2 rounded-md outline-none' type="text" placeholder='Employee name'/>
                            </div>

                            <div className='mt-3'>
                                <h3 className='font-medium text-gray-300'>Category</h3>
                                <input className='bg-[#333] p-2 w-full mt-2 rounded-md outline-none' type="text" placeholder='Design, Development, etc...' />
                            </div>
                        </div>

                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='mt-3 '>
                            <h3 className='font-medium text-gray-300'>Description</h3>
                            <textarea className='bg-[#333] px-2 w-full h-48 py-2 mt-2 rounded-md outline-none' placeholder='Detailed description of task (Max 500 word)' />
                        </div>

                        <div className='flex justify-center mt-5 '>
                            <button className='bg-emerald-400 flex-1 w-full py-4 text-xl font-bold rounded-md cursor-pointer '>
                                Create Task
                            </button>
                        </div>
                    </div>
                </form>
            </div>
  )
}

export default CreateTask