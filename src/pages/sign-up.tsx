import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import Button from '../components/button/button'
import InputText from '../components/input-text/input-text'
import { Link, useNavigate } from 'react-router-dom'
import { Text } from '../components/text/text'

const SignUp = () => {
  const [username, setUsername] = useState<string>('')
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const signUp = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        username: username,
        password: password,
      })

      if (response.status === 200) {
        navigate('/signin')
      }
    } catch (err) {
      const axiosError = err as AxiosError
      if (axiosError.response) {
        if (axiosError.response.status === 409) {
          setError('Nutzername ist schon vergeben')
        } else {
          setError('Registrierung fehlgeschlagen')
        }
      } else {
        setError('Network error or no response received')
      }
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='w-96'>
        <div className='space-y-4'>
          <Text className='text-3xl font-semibold'>Registrierung</Text>
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
            password={true}
            onChange={setPassword}
            setValid={setIsPasswordValid}
          />
        </div>
        <Text className='text-red-500 font-semibold'>{error}</Text>
        <div className='mt-4 flex justify-between '>
          <Button
            onClick={signUp}
            disabled={!isPasswordValid && !isUsernameValid}
          >
            Konto ertellen
          </Button>
          <Link
            className='text-purple-900 hover:cursor-pointer hover:underline'
            to={'/signin'}
          >
            Bei Konto anmelden?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
