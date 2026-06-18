import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTasks = () => {

    const authData = useContext(AuthContext)

    return (
        <div className=' w-full mt-5 rounded-2xl p-5 bg-[#1c1c1c] '>


            <div className='bg-red-400 mb-2 px-4 py-2 flex justify-between items-center'>
                <h2 className='w-1/5'>Employee Name</h2>
                <h3 className=' w-1/5'>NewTask</h3>
                <h5 className=' w-1/5'>Active Task</h5>
                <h5 className=' w-1/5'>Completed Task</h5>
                <h5 className=' w-1/5'>Failed</h5>
            </div>

            <div className='h-[80%] overflow-auto'>
            {authData.employee.map((elem) => {

                return (
                    
                        <div className='border-2 border-green-700 mb-2 px-4 py-2 flex justify-between items-center'>
                            <h2 className=' w-1/5'>{elem.firstName}</h2>
                            <h3 className='text-blue-800 w-1/5'>Task</h3>
                            <h5 className='text-yellow-400 w-1/5'>Status</h5>
                            <h5 className='text-green-800 w-1/5'>Status</h5>
                            <h5 className='text-red-800 w-1/5'>Failed</h5>
                        </div>
                )
            })}
            </div>


        </div>
    )
}

export default AllTasks