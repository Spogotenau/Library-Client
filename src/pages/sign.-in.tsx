import { useState } from 'react'
import InputText from '../components/input-text/input-text'
import Button from '../components/button/button'
import axios from 'axios'

const SignIn = () => {
  const [username, setUsername] = useState<string>('')
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/signin', {
        username: username,
        password: password,
      })

      localStorage.setItem('token', response.data)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div>
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
        Sign in
      </Button>
    </div>
  )
}

export default SignIn
