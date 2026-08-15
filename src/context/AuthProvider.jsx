import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  const hydrateUserData = () => {
    const { employee, admin } = getLocalStorage()
    setUserData({ employee, admin })
  }

  useEffect(() => {
    if (!localStorage.getItem('employees')) {
      setLocalStorage()
    }

    hydrateUserData()

    const handleStorageSync = (event) => {
      if (event.key === 'employees' || event.key === 'admin') {
        hydrateUserData()
      }
    }

    window.addEventListener('storage', handleStorageSync)
    return () => window.removeEventListener('storage', handleStorageSync)
  }, [])

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider