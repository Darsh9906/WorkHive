import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import { ToastProvider, useToast } from './components/Common/StateComponents'

const AppContent = () => {
  const [user, setUser] = useState('')
  const { userData } = useContext(AuthContext)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      try {
        const userDataParsed = JSON.parse(loggedInUser)
        setUser(userDataParsed)
      } catch (err) {
        console.error('Failed to parse loggedInUser:', err)
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === '123') {
      const adminUser = userData?.admin?.[0] || { firstName: 'Admin', email: 'admin@example.com' }
      const newAdminState = { role: 'admin', data: adminUser }
      setUser(newAdminState)
      localStorage.setItem('loggedInUser', JSON.stringify(newAdminState))
      showToast('Logged in as Administrator', 'success')
      return true
    } else if (userData?.employee) {
      const employee = userData.employee.find((e) => email.trim().toLowerCase() === e.email?.trim().toLowerCase() && password === e.password)
      if (employee) {
        const newEmpState = { role: 'employee', data: employee }
        setUser(newEmpState)
        setLoggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify(newEmpState))
        showToast(`Welcome back, ${employee.firstName}!`, 'success')
        return true
      }
    }
    showToast('Invalid email or password. Please try again.', 'error')
    return false
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-xs text-slate-500 font-medium">Loading WorkHive...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      {user?.role === 'admin' ? (
        <AdminDashboard data={user.data} changeUser={setUser} />
      ) : user?.role === 'employee' ? (
        <EmployeeDashboard data={user.data} changeUser={setUser} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  )
}

const App = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}

export default App