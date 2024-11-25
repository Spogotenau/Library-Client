import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Text } from '../components/text/text'
import { List } from '../components/list/list'
import { BookProfilePage } from '../components/book-profile-panel/book-profile-panel'

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
  const navigate = useNavigate()

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
            navigate('/not-found')
          } else {
            setError('Laden des Profils fehlgeschlagen')
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
        <div className='mx-auto w-1/2'>
          <Text className='mt-4 mb-28 text-3xl text-center font-semibold'>
            {profile.username}
          </Text>
          {profile.books.length > 0 ? (
            <>
              <Text className='text-2xl ml-8'>Gelesene Bücher</Text>
              <List className='w-full'>
                {profile.books.map((book) => (
                  <BookProfilePage key={book.id} book={book} />
                ))}
              </List>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center mt-8'>
              <Text className='text-xl text-gray-600'>
                Du hast keine Bücher gelesen
              </Text>
              <Text className='text-gray-500 mt-2'>
                Bücher können jederzeit hinzugefügt werden, dann erscheinen sie
                hier.
              </Text>
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default ProfilePage
