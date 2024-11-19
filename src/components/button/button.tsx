import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
}

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className='bg-slate-500'
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
