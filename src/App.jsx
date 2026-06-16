import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState('')
  const authData = useContext(AuthContext)


  useEffect(() => {
    // setLocalStorage()
    // getLocalStorage()
  },)

  
  
  const handleLogin = (email,password) => {

    if(email === 'admin@example.com' && password === '123') {

      setUser('admin')


      console.log(user);
       
      
    }else if(authData && authData.employee.find((e)=>email == e.email &&  e.password == password)){

      setUser('employee')
      
      console.log(user);
      
      
    }else{
        alert('Invalid Credentials')
    }
  }


  return (
    <div>
       {!user ? <Login handleLogin={handleLogin}/> : ''} 
        {user == 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </div>
  )
}

export default App