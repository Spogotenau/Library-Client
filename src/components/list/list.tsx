import { ReactNode } from 'react'
import { cn } from '../../utils/utils'

type Props = {
  children: ReactNode
  className?: string
}

export const List: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 bg-purple-900 m-4 p-4 rounded-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
