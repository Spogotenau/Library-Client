import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Profile {
  username: string
  books: Book[]
}

interface Book {
  title: string
  id: string
}

const ProfilePage = () => {
  const { username } = useParams()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<Profile>(
          `http://localhost:8080/user/${username}`
        )

        setProfile(response.data)
      } catch (err) {
        const axiosError = err as AxiosError
        if (axiosError.response) {
          if (axiosError.response.status === 404) {
            setError('User not found: ' + username)
          } else {
            setError('Failed to fetch profile')
          }
        } else {
          setError('Network error or no response received')
        }
      }
    }

    fetchProfile()
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      {profile ? (
        <div>
          <h1>{profile.username}</h1>
          {profile.books.map((book) => (
            <h2 key={book.id}>{book.title}</h2>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default ProfilePage
