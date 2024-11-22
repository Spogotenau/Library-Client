import { ChangeEvent, useEffect, useState } from 'react'
import { Text } from '../text/text'

interface Props {
  label: string
  required: boolean
  value: string
  onChange: (value: string) => void
  setValid: (value: boolean) => void
  placeholder?: string
  disabled?: boolean
  characters?: number
}

const InputText = (props: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [hastInteracted, setHasInteracted] = useState<boolean>(false)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value)
    setHasInteracted(true)
  }

  useEffect(() => {
    if (!hastInteracted) return

    if (props.value === '') {
      if (props.required) {
        setError('Dieses Feld wird benötigt')
        props.setValid(false)
        return
      }
    }

    if (props.characters && props.value.length > props.characters) {
      setError('Text ist zu lange')
      props.setValid(false)
      return
    }

    setError(null)
    props.setValid(true)
  }, [props.value])

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
      <input
        onChange={handleOnChange}
        disabled={props.disabled || false}
        value={props.value || ''}
        required={props.required}
        type='text'
        placeholder={props.placeholder}
        className='px-2 py-3 bg-blue-200 border border-purple-900 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900'
      />
      <Text className='text-red-500 text-sm'>{error}</Text>
    </div>
  )
}

export default InputText
