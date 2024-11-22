import { useEffect, useState } from 'react'
import { BookResponse } from '../interfaces/responses/book-response'
import axios from 'axios'
import { useAuth } from '../utils/auth-context'
import { List } from '../components/list/list'
import { BookLibraryPanel } from '../components/book-library-panel/book-library-panel'
import { Text } from '../components/text/text'

const HomePage = () => {
  const [books, setBooks] = useState<BookResponse[]>([])
  const [ids, setIds] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const { token, user } = useAuth()

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        setError('User not authenticated')
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
        setError('Failed to load user profile')
        console.log(err)
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
        setError('Failed to load books')
        console.log(err)
      }
    }

    fetchBooks()
  }, [token])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='flex flex-col items-center'>
      <Text className='m-4 text-3xl font-semibold'>Alle Bücher</Text>
      <div className='flex flex-col items-center w-1/2'>
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
    </div>
  )
}

export default HomePage
