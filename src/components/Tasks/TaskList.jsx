import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({data}) => {
    
    console.log(data);
    

  return (
    <div className='h-[55%] flex-nowrap flex justify-start gap-4 items-center w-full mt-10 p-5 overflow-x-auto scrollbar-none'>
       
      {data.tasks.map((elem,idx)=>{

        if(elem.active){
            return <AcceptTask key={idx}/>
        }
        if(elem.newTask){
            return <NewTask key={idx}/>
        }
        if(elem.completed){
            return <CompleteTask key={idx}/>
        }
        if(elem.failed){
            return <FailedTask key={idx}/>
        }
      })}
    

    </div>
  )
}

export default TaskList