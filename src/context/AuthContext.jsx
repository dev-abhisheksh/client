import { createContext, useContext, useEffect, useState } from 'react'
import { getMe } from '../api/auth.api';

export const AuthContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const verifyUser = async () => {
    try {
      const res = await getMe();
      setUser(res.data.user)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}