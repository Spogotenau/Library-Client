import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../button/button'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../../utils/auth-context'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Text } from '../text/text'

type Props = { book: { title: string; id: string } }

export const BookProfilePage: React.FC<Props> = ({ book }) => {
  const { user } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const removeBookFromList = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/user/${user}/remove-book/${book.id}`
      )

      if (response.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      const axiosError = err as AxiosError
      if (axiosError.response) {
        if (axiosError.response.status === 404) {
          setError(axiosError.message)
        } else {
          setError('Buch entfernen fehlgeschlagen')
        }
      } else {
        setError('Network error or no response received')
      }
    }
  }

  return (
    <div className='flex justify-between items-center m-2 p-2 rounded-md border border-blue-200 bg-blue-200 hover:border-blue-100 hover:outline-none hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50'>
      <div>
        <Link
          className='text-lg text-purple-900 hover:underline hover:cursor-pointer'
          to={`/library/book/${book.id}`}
        >
          {book.title}
        </Link>
        <Text className='text-red-500'>{error}</Text>
      </div>
      <Button styling='secondary' onClick={removeBookFromList}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>
    </div>
  )
}
