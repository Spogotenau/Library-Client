import { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/utils'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  styling?: 'primary' | 'secondary'
}

const Button = ({ className, styling = 'primary', ...props }: Props) => {
  const styles = {
    primary:
      'px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-950',
    secondary:
      'px-4 py-2 bg-blue-200 text-purple-900 border border-purple-900 rounded-lg hover:border-purple-800 hover:outline-none hover:ring-2 hover:ring-purple-900 hover:ring-opacity-50',
  }

  return (
    <button className={cn(styles[styling], className)} {...props}>
      {props.children}
    </button>
  )
}

export default Button
