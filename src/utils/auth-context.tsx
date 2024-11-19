import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  role: string | null
  token: string | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: { role: string } = jwtDecode(token)
        setRole(decodedToken.role)
      } catch (error) {
        console.error('Invalid token:', error)
        setRole(null)
      }
    } else {
      setRole(null)
    }
    setLoading(false)
  }, [token])

  return (
    <AuthContext.Provider value={{ role, token, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
