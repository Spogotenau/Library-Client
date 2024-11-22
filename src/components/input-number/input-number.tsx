import { useState, ChangeEvent } from 'react'
import { Text } from '../text/text'

type Props = {
  label: string
  required: boolean
  value: number
  onChange: (value: number) => void
  placeholder?: string
  disabled?: boolean
}

export const InputNumber: React.FC<Props> = ({
  label,
  required,
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  const [error, setError] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState<boolean>(false)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? 0 : Number(event.target.value)
    if (isNaN(newValue)) {
      setError('Ungültige Eingabe')
      return
    }
    setError(null)
    onChange(newValue)
    setHasInteracted(true)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'e' ||
      event.key === 'E' ||
      event.key === '+' ||
      event.key === '-'
    ) {
      event.preventDefault()
    }
  }

  return (
    <div>
      <div className='m-1'>
        <Text>{label + (required ? '*' : '')}</Text>
      </div>
      <input
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        disabled={disabled || false}
        value={value || ''}
        required={required}
        type='number'
        placeholder={placeholder}
        className='px-2 py-3 bg-blue-200 border border-purple-900 rounded-md w-full no-spinner focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900'
      />
      <Text className='text-red-500 text-sm'>{error}</Text>
    </div>
  )
}
