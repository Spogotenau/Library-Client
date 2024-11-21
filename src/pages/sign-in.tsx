import { useState } from 'react'
import InputText from '../components/input-text/input-text'
import Button from '../components/button/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth-context'

const SignIn = () => {
  const { setToken } = useAuth()
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
      setToken(response.data)
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div>
      <h1>Anmeldung</h1>
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
      <Button
        onClick={loginUser}
        disabled={!isPasswordValid && !isUsernameValid}
      >
        Anmelden
      </Button>
    </div>
  )
}

export default SignIn
