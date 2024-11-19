import { ChangeEvent, useEffect, useState } from 'react'

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
  const [error, setError] = useState<string>('')
  const [hastInteracted, setHasInteracted] = useState<boolean>(false)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value)
    setHasInteracted(true)
  }

  useEffect(() => {
    if (!hastInteracted) return

    if (props.value === '') {
      if (props.required) {
        setError('DiesesFeld wird benötigt')
        props.setValid(false)
        return
      }
    }

    if (props.characters && props.value.length > props.characters) {
      setError('Text ist zu lange')
      props.setValid(false)
      return
    }

    setError('')
    props.setValid(true)
  }, [props.value])

  return (
    <div>
      <div>
        <p>{props.label + (props.required ? '*' : '')}</p>
        {props.characters ? (
          <p>
            {props.value?.length || 0}/{props.characters}
          </p>
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
      />
    </div>
  )
}

export default InputText
