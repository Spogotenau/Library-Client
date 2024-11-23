import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RootLayout from './components/layout/root-layout'
import ProfilePage from './pages/profile-page'
import SignUp from './pages/sign-up'
import SignIn from './pages/sign-in'
import BookPage from './pages/book-page'
import Unauthorized from './pages/unauthorized'
import Settings from './pages/settings'
import { AuthProvider } from './utils/auth-context'
import HomePage from './pages/home-page'
import { NotFound } from './pages/not-found'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/unauthorized' element={<Unauthorized />} />

          <Route
            element={<RootLayout allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}
          >
            <Route path='/library' element={<HomePage />} />
            <Route path='/library/user/:username' element={<ProfilePage />} />
            <Route path='/library/book/:id' element={<BookPage />} />
          </Route>

          <Route element={<RootLayout allowedRoles={['ROLE_ADMIN']} />}>
            <Route path='/settings' element={<Settings />} />
          </Route>

          <Route path='/' element={<Navigate to='/library' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
