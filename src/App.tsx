import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './components/layout/root-layout'
import ProfilePage from './pages/profile-page'
import SignUp from './pages/sign-up'
import SignIn from './pages/sign.-in'
import BookPage from './pages/book-page'
import Unauthorized from './pages/unauthorized'
import Settings from './pages/settings'
import { AuthProvider } from './utils/auth-context'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route
            path='/'
            element={<RootLayout allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}
          >
            <Route path=':username' element={<ProfilePage />} />
            <Route path='book/:id' element={<BookPage />} />
          </Route>
          <Route element={<RootLayout allowedRoles={['ROLE_ADMIN']} />}>
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
