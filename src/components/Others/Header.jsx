import React from 'react'
import Login from '../Auth/Login'

const Header = (props) => {  
 

  const logOutUser = ()=> {

    localStorage.setItem('loggedInUser','')
    // window.location.reload()
    props.changeUser('')
    
  }

  return (
    <div className='flex justify-between items-end'>
        <div className=''>
            <h2 className='text-2xl '>Hello, <br /> <span className='text-4xl font-bold text-center'>{props.data?.firstName}👋 </span></h2>
        </div>

        <button 
        onClick={logOutUser}
        className='bg-red-700 font-medium px-4 py-1 rounded-md cursor-pointer active:scale-95'>
          Log Out</button>
    </div>
  )
}

export default Header
