import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../utils/auth-context'
import Navbar from '../navbar/navbar'

interface Props {
  allowedRoles: string[]
}

const RootLayout = ({ allowedRoles }: Props) => {
  const { role, token, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!token) {
    return <Navigate to='/signin' />
  }

  if (!allowedRoles.includes(role!)) {
    return <Navigate to='/unauthorized' />
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default RootLayout
