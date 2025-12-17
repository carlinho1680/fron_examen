import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = jwtDecode(token)
        setUser(payload)
      } catch {
        localStorage.removeItem('token')
      }
    }
  }, [])

  const login = (data) => {
    localStorage.setItem("token", data.token)
    setUser({ email: data.email, rol: data.rol })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
