import { useEffect, useState } from 'react'
import { BookResponse } from '../interfaces/responses/book-response'
import { useAuth } from '../utils/auth-context'
import axios, { AxiosError } from 'axios'
import Button from '../components/button/button'
import Modal from '../components/modal/modal'
import { BookSettingsPanel } from '../components/book-settings-panel/book-settings-panel'
import { List } from '../components/list/list'
import { Text } from '../components/text/text'
import { InputNumber } from '../components/input-number/input-number'
import InputText from '../components/input-text/input-text'
import { ProfilePanel } from '../components/profile-panel/profile-panel'

const Settings = () => {
  const { token } = useAuth()

  const [books, setBooks] = useState<BookResponse[]>([])
  const [booksError, setBooksError] = useState<string | null>(null)
  const [profiles, setProfiles] = useState<string[]>([])
  const [profilesError, setProfilesError] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [createError, setCreateError] = useState<string | null>(null)

  const [title, setTitle] = useState<string>()
  const [isTitleValid, setIsTitleValid] = useState<boolean>(false)
  const [author, setAuthor] = useState<string>()
  const [isAuthorValid, setIsAuthorValid] = useState<boolean>(false)
  const [pages, setPages] = useState<number>()
  const [isPagesValid, setIsPagesValid] = useState<boolean>(false)

  const toggleModal = () => {
    if (isModalOpen) {
      setTitle(undefined)
      setAuthor(undefined)
      setPages(undefined)
    }

    setIsModalOpen(!isModalOpen)
  }

  const createBook = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/book',
        {
          title: title,
          author: author,
          pages: pages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      const axiosError = err as AxiosError
      if (axiosError.response) {
        setCreateError('Bearbeitung fehlgeschlagen')
      } else {
        setCreateError('Network error or no response received')
      }
    }
  }

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
    <div className='ml-40'>
      <Text className='m-4 text-3xl font-semibold'>Einstellungen</Text>
      <div className='flex flex-col items-center w-2/3 mb-12'>
        <div className='flex justify-between w-full items-center'>
          <Text className='text-2xl ml-4'>Bücher</Text>
          <Button onClick={toggleModal}>Hinzufügen</Button>
        </div>

        {booksError ? (
          <div>{booksError}</div>
        ) : (
          <List className='w-full'>
            {books.map((book) => (
              <BookSettingsPanel key={book.id} book={book} />
            ))}
          </List>
        )}
      </div>

      <div className='flex flex-col items-center w-1/3'>
        <Text className='text-2xl self-start ml-4'>Profile</Text>
        {profilesError ? (
          <div>{profilesError}</div>
        ) : (
          <List className='w-full'>
            {profiles.map((username) => (
              <ProfilePanel key={username} username={username} />
            ))}
          </List>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onSubmit={createBook}
        onClose={toggleModal}
        type='create'
        title='Buch hinzufügen'
      >
        <InputText
          label='Titel'
          required={true}
          value={title}
          onChange={setTitle}
          setValid={setIsTitleValid}
        />
        <InputText
          label='Autor'
          required={true}
          value={author}
          onChange={setAuthor}
          setValid={setIsAuthorValid}
        />
        <InputNumber
          label='Seitenanzahl'
          required={true}
          value={pages}
          onChange={setPages}
          setValid={setIsPagesValid}
        />
        {createError ? (
          <Text className='text-red-500 text-sm'>{createError}</Text>
        ) : (
          ''
        )}
      </Modal>
    </div>
  )
}

export default Settings
