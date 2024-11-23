import { Link } from 'react-router-dom'

type Props = { username: string }

export const ProfilePanel: React.FC<Props> = ({ username }) => {
  return (
    <div className='flex justify-between items-center m-2 p-2 rounded-md border border-blue-200 bg-blue-200 hover:border-blue-100 hover:outline-none hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50'>
      <div>
        <Link
          className='text-lg text-purple-900 hover:underline hover:cursor-pointer'
          to={`/library/user/${username}`}
        >
          {username}
        </Link>
      </div>
    </div>
  )
}
