import axios from 'axios'
import { useState } from 'react'
import Button from '../components/button/button'
import InputText from '../components/input-text/input-text'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [username, setUsername] = useState<string>('')
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

  const navigate = useNavigate()

  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        username: username,
        password: password,
      })

      navigate('/signin')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div>
      <h1>Registrierung</h1>
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
        Registrieren
      </Button>
    </div>
  )
}

export default SignUp
