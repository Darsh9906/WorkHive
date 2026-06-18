import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTasks = () => {

    const {userData} = useContext(AuthContext)

    return (
        <div className=' w-full mt-5 rounded-2xl p-5 bg-[#1c1c1c] '>


            <div className='bg-red-400 mb-2 px-4 py-2 flex justify-between items-center'>
                <h2 className='text-lg  font-medium w-1/5'>Employee Name</h2>
                <h3 className='text-lg  font-medium  w-1/5'>NewTask</h3>
                <h5 className='text-lg  font-medium  w-1/5'>Active Task</h5>
                <h5 className='text-lg  font-medium  w-1/5'>Completed Task</h5>
                <h5 className='text-lg  font-medium  w-1/5'>Failed</h5>
            </div>

            <div className='h-[80%] overflow-auto'>
            {userData.employee.map((elem,idx) => {

                return (
                    
                        <div key={idx} className='border-2 border-green-700 mb-2 px-4 py-2 flex justify-between items-center'>
                            <h2 className='text-[14px] font-bold w-1/5'>{elem.firstName}</h2>
                            <h3 className='text-lg font-medium text-blue-800 w-1/5'>{elem.taskNumber.active}</h3>
                            <h5 className='text-lg font-medium text-yellow-400 w-1/5'>{elem.taskNumber.newTask}</h5>
                            <h5 className='text-lg font-medium text-green-800 w-1/5'>{elem.taskNumber.completed}</h5>
                            <h5 className='text-lg font-medium text-red-800 w-1/5'>{elem.taskNumber.failed}</h5>
                        </div>
                )
            })}
            </div>


        </div>
    )
}

export default AllTasks