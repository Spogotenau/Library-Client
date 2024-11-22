import { ChangeEvent, useEffect, useState } from 'react'
import { Text } from '../text/text'

interface Props {
  label: string
  required: boolean
  value: string | undefined
  onChange: (value: string) => void
  setValid: (value: boolean) => void
  placeholder?: string
  disabled?: boolean
  characters?: number
}

const InputText = (props: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState<boolean>(false)

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
