import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BookResponse } from '../../interfaces/responses/book-response'
import Button from '../button/button'
import { Text } from '../text/text'
import { useAuth } from '../../utils/auth-context'
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Link } from 'react-router-dom'

type Props = { book: BookResponse; ids: string[] }

export const BookLibraryPanel: React.FC<Props> = ({ book, ids }) => {
  const { user } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const isInList = ids.includes(book.id)

  const addBookToList = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/${user}/add-book/${book.id}`
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
          setError('Buch hinzufügen fehlgeschlagen')
        }
      } else {
        setError('Network error or no response received')
      }
    }
  }

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

      {isInList ? (
        <Button styling='secondary' onClick={removeBookFromList}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      ) : (
        <Button onClick={addBookToList}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      )}
    </div>
  )
}
