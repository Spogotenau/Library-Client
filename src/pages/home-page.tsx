import { useEffect, useState } from 'react'
import { BookResponse } from '../interfaces/responses/book-response'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../utils/auth-context'
import { List } from '../components/list/list'
import { BookLibraryPanel } from '../components/book-library-panel/book-library-panel'
import { Text } from '../components/text/text'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [books, setBooks] = useState<BookResponse[]>([])
  const [ids, setIds] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const { token, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBooks = async () => {
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
        const axiosError = err as AxiosError
        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            navigate('/signin')
          } else {
            setError('Bücher laden fehlgeschlagen')
          }
        } else {
          setError('Network error or no response received')
        }
      }

      try {
        const response = await axios.get<BookResponse[]>(
          'http://localhost:8080/book',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setBooks(response.data)
      } catch (err) {
        const axiosError = err as AxiosError
        if (axiosError.response) {
          if (axiosError.response.status === 401) {
            navigate('/signin')
          } else {
            setError('Bücher laden fehlgeschlagen')
          }
        } else {
          setError('Network error or no response received')
        }
      }
    }

    fetchBooks()
  }, [token])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <div className='mx-auto w-1/2'>
        <Text className='m-4 text-3xl font-semibold text-center'>
          Alle Bücher
        </Text>
        {books.length > 0 ? (
          <List className='w-full'>
            {books.map((book) => (
              <BookLibraryPanel key={book.id} book={book} ids={ids} />
            ))}
          </List>
        ) : (
          <div>Loading...</div> // todo implement spinner
        )}
      </div>
    </>
  )
}

export default HomePage
