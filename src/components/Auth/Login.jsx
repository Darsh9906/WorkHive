import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const submitHandler = (e) => {

    e.preventDefault()
    
    console.log(email);
    console.log(password);
    
    setEmail('')
    setPassword('')
  }

  return (
    <div className='flex h-screen w-screen justify-center items-center '>
        <div className='p-20 border-2 border-red-900 rounded-2xl'>

        <form 
        onSubmit={(e)=>{
          submitHandler(e)
        }}
        className='flex flex-col gap-3 p-5'>
            <input 
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}    
            className='border-2 rounded-3xl px-4 py-2 bg-transparent border-red-800 outline-none placeholder:text-gray-400' 
            type="email" placeholder='Enter your email' 
            />
            <input 
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
            className='border-2 rounded-3xl px-4 py-2 bg-transparent border-red-800 outline-none  placeholder:text-gray-400' 
            type="password" placeholder='Enter your password' 
            />
            <button className='mt-5 bg-red-900 border-none rounded-3xl p-2 cursor-pointer active:scale-95 font-bold'>Log in</button>
        </form>
        </div>
    </div>
  )
}

export default Login