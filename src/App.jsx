import React, { useContext, useEffect, useMemo, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import { ToastProvider, useToast } from './components/Common/StateComponents'
import { ThemeProvider } from './context/ThemeContext'

const AppContent = () => {
  const [user, setUser] = useState('')
  const { userData } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  const resolvedUserData = useMemo(() => {
    if (!user?.role || !userData) return null

    if (user.role === 'admin') {
      return userData.admin?.find((admin) => admin.email === user.data?.email) || userData.admin?.[0] || user.data
    }

    if (user.role === 'employee') {
      return userData.employee?.find((employee) => String(employee.id) === String(user.data?.id)) || null
    }

    return null
  }, [user, userData])

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

  useEffect(() => {
    if (!user?.role || !userData || !resolvedUserData) return

    if (user.role === 'employee' && String(user.data?.id) !== String(resolvedUserData.id)) {
      const nextUser = { ...user, data: resolvedUserData }
      setUser(nextUser)
      localStorage.setItem('loggedInUser', JSON.stringify(nextUser))
    }

    if (user.role === 'admin' && user.data?.email !== resolvedUserData.email) {
      const nextUser = { ...user, data: resolvedUserData }
      setUser(nextUser)
      localStorage.setItem('loggedInUser', JSON.stringify(nextUser))
    }
  }, [resolvedUserData, user, userData])

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === '123') {
      const adminUser = userData?.admin?.[0] || { firstName: 'Admin', email: 'admin@example.com' }
      const newAdminState = { role: 'admin', data: adminUser }
      setUser(newAdminState)
      localStorage.setItem('loggedInUser', JSON.stringify(newAdminState))
      showToast('Logged in as Administrator', 'success')
      return true
    }

    if (userData?.employee) {
      const employee = userData.employee.find((e) => {
        const matchEmail = email.trim().toLowerCase() === e.email?.trim().toLowerCase()
        return matchEmail && password === e.password
      })

      if (employee) {
        const newEmpState = { role: 'employee', data: employee }
        setUser(newEmpState)
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
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-slate-300 dark:border-slate-700 border-t-emerald-600 dark:border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Loading WorkHive...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {user?.role === 'admin' ? (
        <AdminDashboard data={resolvedUserData || user.data} changeUser={setUser} />
      ) : user?.role === 'employee' ? (
        <EmployeeDashboard data={resolvedUserData || user.data} changeUser={setUser} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App

