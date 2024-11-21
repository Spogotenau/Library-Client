import { ReactNode } from 'react'
import { cn } from '../../utils/utils'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const Text: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <p onClick={onClick} className={cn('text-purple-900', className)}>
      {children}
    </p>
  )
}
