import React, { useContext, useState } from 'react'
import { PlusCircle  } from 'lucide-react'
import { AuthContext } from '../../context/AuthProvider'



const CreateTask = () => {


   const {userData,setUserData} =  useContext(AuthContext)


    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')


    
    const submitHandler = (e)=> {

        e.preventDefault()

         const task = {
    taskDate,
    taskDescription,
    category,
    taskTitle,
    active:false,
    newTask:true,
    completed:false,
    failed:false
}
        
        const data = [...userData.employee]

        
       data.forEach((emp)=>{

    if(

      emp.firstName.toLowerCase()

      ===

      asignTo.toLowerCase()

    ){

        emp.tasks.push(task)

    }

})

setUserData({

    ...userData,

    employee: data

})

localStorage.setItem(

  'employees',

  JSON.stringify(data)

)

        
        setAsignTo('')
        setCategory('')
        setTaskDate('')
        setTaskDescription('')
        setTaskTitle('')

    }

  return (
      <div >
                <form onSubmit={(e)=>{

                    submitHandler(e)
                }} 
                className='flex justify-between mt-6 bg-[#212121] p-4 gap-10'
                >
                        
                        <div className='w-1/2'>
                            <div >
                                <h3 className='font-medium text-gray-300'>Task Title</h3>
                                <input
                                value={taskTitle}
                                onChange={(e)=>{
                                    
                                    setTaskTitle(e.target.value)
                                }} 
                                className='bg-[#333] p-2 w-full mt-2 rounded-md outline-none' type="text" placeholder='Make a UI design' />
                            </div>

                            <div className='mt-3'>
                                <h3 className='font-medium text-gray-300'>Date</h3>
                                <input 
                                 value={taskDate}
                                onChange={(e)=>{
                                    
                                    setTaskDate(e.target.value)
                                }} 
                                className='bg-[#333] p-2 w-full mt-2 rounded-md outline-none' type="date" />
                            </div>

                            <div className='mt-3'>
                                <h3 className='font-medium text-gray-300'>Assign To</h3>
                                <input 
                                 value={asignTo}
                                onChange={(e)=>{
                                    
                                    setAsignTo(e.target.value)
                                }} 
                                className='bg-[#333] p-2 w-full mt-2 rounded-md outline-none' type="text" placeholder='Employee name'/>
                            </div>

                            <div className='mt-3'>
                                <h3 className='font-medium text-gray-300'>Category</h3>
                                <input 
                                 value={category}
                                onChange={(e)=>{
                                    
                                    setCategory(e.target.value)
                                }}  
                                 className='bg-[#333] p-2 w-full mt-2 rounded-md outline-none' type="text" placeholder='Design, Development, etc...' />
                            </div>
                        </div>

                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='mt-3 '>
                            <h3 className='font-medium text-gray-300'>Description</h3>
                            <textarea 
                             value={taskDescription}
                                onChange={(e)=>{
                                    
                                    setTaskDescription(e.target.value)
                                }} 
                            className='bg-[#333] h-48 px-2 w-full py-2 mt-2 rounded-md outline-none ' />
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