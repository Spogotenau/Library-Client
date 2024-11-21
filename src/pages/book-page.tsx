import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BookResponse } from '../interfaces/responses/book-response'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../utils/auth-context'

const BookPage = () => {
  const { id } = useParams()
  const { token } = useAuth()
  const [book, setBook] = useState<BookResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
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
            setError('Book not found: ' + id)
          } else {
            setError('Failed to fetch book')
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
    <div>
      {book ? (
        <div>
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Pages: {book.pages}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default BookPage
