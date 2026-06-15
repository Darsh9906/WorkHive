import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-end'>
        <div className=''>
            <h2 className='text-2xl '>Hello, <br /> <span className='text-4xl font-bold text-center'>Darsh 👋 </span></h2>
        </div>

        <button className='bg-red-700 font-medium px-4 py-1 rounded-md cursor-pointer active:scale-95'>Log Out</button>
    </div>
  )
}

export default Header
