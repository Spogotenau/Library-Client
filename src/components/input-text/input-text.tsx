import { ChangeEvent, useEffect, useState } from 'react'
import { Text } from '../text/text'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../button/button'

interface Props {
  label: string
  required: boolean
  value: string | undefined
  onChange: (value: string) => void
  setValid: (value: boolean) => void
  placeholder?: string
  disabled?: boolean
  characters?: number
  password?: boolean
}

const InputText = (props: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value)
    setHasInteracted(true)
  }

  useEffect(() => {
    if (!hasInteracted) return

    const valueLength = props.value?.length || 0

    if (props.required && (!props.value || props.value === '')) {
      setError('Dieses Feld wird benötigt')
      props.setValid(false)
      return
    }

    if (props.characters && valueLength > props.characters) {
      setError(`Maximal ${props.characters} Zeichen erlaubt`)
      props.setValid(false)
      return
    }

    setError(null)
    props.setValid(true)
  }, [
    props.value,
    props.required,
    props.characters,
    hasInteracted,
    props.setValid,
  ])

  return (
    <div>
      <div className='m-1'>
        <Text>{props.label + (props.required ? '*' : '')}</Text>
        {props.characters ? (
          <Text>
            {props.value?.length || 0}/{props.characters}
          </Text>
        ) : (
          ''
        )}
      </div>
      <div className='relative'>
        <input
          onChange={handleOnChange}
          disabled={props.disabled || false}
          value={props.value || ''}
          required={props.required}
          type={props.password ? (showPassword ? 'text' : 'password') : 'text'}
          placeholder={props.placeholder}
          className='px-2 py-3 bg-blue-200 border border-purple-900 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900'
        />
        {props.password && (
          <Button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute right-0.5 top-1/2 transform -translate-y-1/2 bg-blue-200 text-purple-900 hover:text-purple-700 hover:bg-blue-200 focus:outline-none'
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className='w-5 h-5'
            />
          </Button>
        )}
      </div>
      <Text className='text-red-500 text-sm'>{error}</Text>
    </div>
  )
}

export default InputText
