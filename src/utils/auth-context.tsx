import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  role: string | null
  token: string | null
  user: string | null
  loading: boolean
  setCurrentUser: (token: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  const setCurrentUser = (resToken: string | null) => {
    if (resToken) {
      try {
        const decodedToken: { role: string; sub: string } = jwtDecode(resToken)

        setToken(resToken)
        setRole(decodedToken.role)
        setUser(decodedToken.sub)
      } catch (error) {
        console.error('Invalid token:', error)
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setRole(null)
    setUser(null)
    navigate('/signin')
  }

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const decodedToken: { role: string; sub: string; exp: number } =
            jwtDecode(storedToken)

          setToken(storedToken)
          setRole(decodedToken.role)
          setUser(decodedToken.sub)
        } catch (error) {
          console.error('Invalid token:', error)
        }
      }
      setLoading(false)
    }

    fetchToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{ role, token, user, loading, setCurrentUser, logout }}
    >
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
