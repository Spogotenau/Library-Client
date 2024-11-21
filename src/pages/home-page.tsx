import { useEffect, useState } from 'react'
import { BookResponse } from '../interfaces/responses/book-response'
import axios from 'axios'
import { useAuth } from '../utils/auth-context'

const HomePage = () => {
  const [books, setBooks] = useState<BookResponse[]>([])
  const [error, setError] = useState<string | null>(null)
  const { token } = useAuth()

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        setError('User not authenticated')
        return
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
    <div>
      <h1>Book List</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Pages:</strong> {book.pages}
              </p>
              <p>
                <strong>ID:</strong> {book.id}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div> // todo implement spinner
      )}
    </div>
  )
}

export default HomePage
