import { useState } from 'react'
import InputText from '../components/input-text/input-text'
import Button from '../components/button/button'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth-context'
import { Text } from '../components/text/text'

const SignIn = () => {
  const { setCurrentUser } = useAuth()
  const [username, setUsername] = useState<string>('')
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

  const navigate = useNavigate()

  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/signin', {
        username: username,
        password: password,
      })

      localStorage.setItem('token', response.data)
      setCurrentUser(response.data)
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='w-96'>
        <div className='space-y-4'>
          <Text className='text-3xl font-semibold'>Anmeldung</Text>
          <InputText
            label='Nutzername'
            required={true}
            value={username}
            onChange={setUsername}
            setValid={setIsUsernameValid}
          />
          <InputText
            label='Passwort'
            required={true}
            value={password}
            onChange={setPassword}
            setValid={setIsPasswordValid}
          />
        </div>
        <div className='mt-4 flex justify-between'>
          <Button
            onClick={loginUser}
            disabled={!isPasswordValid && !isUsernameValid}
          >
            Anmelden
          </Button>
          <Link
            className='text-purple-900 hover:cursor-pointer hover:underline'
            to={'/signup'}
          >
            Noch kein Konto?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
