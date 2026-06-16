import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthContext } from './context/AuthProvider'

const App = () => {

  const [user, setUser] = useState('')
  const authData = useContext(AuthContext)
  const [loggedInUserData, setLoggedInUserData] = useState(null)


  useEffect(() => {
    // setLocalStorage()  
    // getLocalStorage()
  }, [])


  useEffect(() => {

    if (authData) {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

      if (loggedInUser) {
        setUser(loggedInUser)
      }
    }

  }, [authData])


  const handleLogin = (email, password) => {

    if (email === 'admin@example.com' && password === '123') {

      const adminUser = authData.admin[0]

      setUser({

        role: 'admin',

        data: adminUser

      })
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))


    } else if (authData) {

      const employee = authData.employee.find((e) => email == e.email && e.password == password)

      if (employee) {
        setUser({ role: 'employee', data: employee })
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))

      } else {

        alert('Invalid Credentials')
      }
    }
  }


  return (
    <div>
      {user?.role === 'admin' ? (
        <AdminDashboard data={user.data} />
      ) : user?.role === 'employee' ? (
        <EmployeeDashboard data={user.data} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  )
}

export default App