import { useEffect, useState } from 'react'
import { BookResponse } from '../interfaces/responses/book-response'
import { useAuth } from '../utils/auth-context'
import axios from 'axios'
import Button from '../components/button/button'
import Modal from '../components/modal/modal'
import { BookSettingsPanel } from '../components/book-settings-panel/book-settings-panel'
import { List } from '../components/list/list'
import { Text } from '../components/text/text'

const Settings = () => {
  const { token } = useAuth()

  const [books, setBooks] = useState<BookResponse[]>([])
  const [booksError, setBooksError] = useState<string | null>(null)
  const [profiles, setProfiles] = useState<string[]>([])
  const [profilesError, setProfilesError] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const deleteBook = () => {}

  useEffect(() => {
    const fetchBooksAndProfiles = async () => {
      try {
        const booksResponse = await axios.get<BookResponse[]>(
          'http://localhost:8080/book',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setBooks(booksResponse.data)
      } catch (err) {
        setBooksError('Failed to fetch books')
      }

      try {
        const profilesResponse = await axios.get<{ username: string }[]>(
          'http://localhost:8080/user'
        )
        const usernames = profilesResponse.data.map(
          (profile) => profile.username
        )
        setProfiles(usernames)
      } catch (err) {
        setProfilesError('Failed to fetch users')
      }
    }

    fetchBooksAndProfiles()
  }, [token])

  return (
    <div>
      <Text className='m-4 text-3xl underline'>Settings</Text>

      <div>
        <Text className='ml-4 text-xl'>Books</Text>
        {booksError ? (
          <div>{booksError}</div>
        ) : (
          <List>
            {books.map((book) => (
              <BookSettingsPanel book={book} />
            ))}
          </List>
        )}
      </div>

      <div>
        <Text className='ml-4 text-xl'>Profiles</Text>
        {profilesError ? (
          <div>{profilesError}</div>
        ) : (
          <ul>
            {profiles.map((username) => (
              <li key={username}>{username}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Settings
