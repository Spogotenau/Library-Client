import axios from 'axios'
import { useState } from 'react'
import Button from '../components/button/button'
import InputText from '../components/input-text/input-text'
import { useNavigate } from 'react-router-dom'
import { Text } from '../components/text/text'

const SignUp = () => {
  const [username, setUsername] = useState<string>('')
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

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
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='w-96'>
        <div className='space-y-4'>
          <Text className='text-3xl'>Registrierung</Text>
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
        <div className='mt-4 flex justify-between '>
          <Button
            onClick={signUp}
            disabled={!isPasswordValid && !isUsernameValid}
          >
            Anmelden
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
