import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BookResponse } from '../interfaces/responses/book-response'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../utils/auth-context'
import { Text } from '../components/text/text'
import Button from '../components/button/button'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BookPage = () => {
  const { id } = useParams()
  const { token, user } = useAuth()
  const [book, setBook] = useState<BookResponse | null>(null)
  const [ids, setIds] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const isInList = () => {
    if (ids && book?.id !== undefined) {
      return ids.includes(book.id)
    }
  }

  const addBookToList = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/user/${user}/add-book/${book?.id}`
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
        `http://localhost:8080/user/${user}/remove-book/${book?.id}`
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

  useEffect(() => {
    const fetchBook = async () => {
      if (!token) {
        setError('Nutzer ist nicht authentifiziert')
        return
      }

      try {
        const profilesResponse = await axios.get<{
          username: string
          books: { title: string; id: string }[]
        }>(`http://localhost:8080/user/${user}`)
        const bookIds = profilesResponse.data.books.map((book) => book.id)
        setIds(bookIds)
      } catch (err) {
        setError('Laden fehlgeschlagen')
        console.log(err)
      }

      try {
        const response = await axios.get<BookResponse>(
          `http://localhost:8080/book/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setBook(response.data)
      } catch (err) {
        const axiosError = err as AxiosError
        if (axiosError.response) {
          if (axiosError.response.status === 404) {
            navigate('/not-found')
          } else {
            setError('Buch laden fehlgeschlagen')
          }
        } else {
          setError('Network error or no response received')
        }
      }
    }

    fetchBook()
  }, [token])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='bg-purple-900 w-1/3 mx-auto mt-20 rounded-lg'>
      {book ? (
        <div className='p-6'>
          <Text className='text-3xl text-blue-200 mb-1'>{book.title}</Text>
          <hr className='mb-4' />
          <div className='flex justify-between'>
            <div>
              <Text className='text-xl text-blue-200'>
                Autor: {book.author}
              </Text>
              <Text className='text-xl text-blue-200'>
                Seitenanzahl: {book.pages}
              </Text>
            </div>
            <div className='flex flex-col justify-end'>
              {isInList() ? (
                <Button styling='secondary' onClick={removeBookFromList}>
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
              ) : (
                <Button styling='secondary' onClick={addBookToList}>
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default BookPage
