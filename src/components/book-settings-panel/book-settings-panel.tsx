import { useState } from 'react'
import { BookResponse } from '../../interfaces/responses/book-response'
import Button from '../button/button'
import { Text } from '../text/text'
import Modal from '../modal/modal'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/auth-context'
import axios, { AxiosError } from 'axios'
import InputText from '../input-text/input-text'
import { InputNumber } from '../input-number/input-number'

type Props = {
  book: BookResponse
}

export const BookSettingsPanel: React.FC<Props> = ({ book }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [editError, setEditError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { token } = useAuth()

  const [title, setTitle] = useState<string>(book.title)
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true)
  const [author, setAuthor] = useState<string>(book.author)
  const [isAuthorValid, setIsAuthorValid] = useState<boolean>(true)
  const [pages, setPages] = useState<number>(book.pages)

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen)
  }

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen)
  }

  const updateBook = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/book/${book.id}`,
        {
          id: book.id,
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
        if (axiosError.response.status === 404) {
          setEditError('Kein Buch mit dieser ID gefunden')
        } else {
          setEditError('Bearbeitung fehlgeschlagen')
        }
      } else {
        setEditError('Network error or no response received')
      }
    }
  }

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/book/${book.id}`,
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
        if (axiosError.response.status === 404) {
          setDeleteError('Kein Buch mit dieser ID gefunden')
        } else {
          setDeleteError('Löschung fehlgeschlagen')
        }
      } else {
        setDeleteError('Network error or no response received')
      }
    }
  }

  return (
    <div className='flex justify-between items-center m-2 p-2 rounded-md border border-blue-200 bg-blue-200 hover:border-blue-100 hover:outline-none hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50'>
      <Text
        className='text-lg hover:underline hover:cursor-pointer'
        onClick={() => navigate(`/library/book/${book.id}`)}
      >
        {book.title}
      </Text>
      <div className='flex gap-4'>
        <Button onClick={toggleEditModal} styling='secondary'>
          Bearbeiten
        </Button>
        <Button
          onClick={toggleDeleteModal}
          className='bg-red-600 text-white hover:bg-red-700'
        >
          Löschen
        </Button>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        onSubmit={updateBook}
        onClose={toggleEditModal}
        title='Buch bearbeiten'
        type='update'
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
        />
        {deleteError ? (
          <Text className='text-red-500 text-sm'>{editError}</Text>
        ) : (
          ''
        )}
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onSubmit={deleteBook}
        onClose={toggleDeleteModal}
        title='Buch Löschen'
        type='delete'
      >
        <Text className='text-md'>Wollen Sie das Buch wirklich löschen?</Text>
        {deleteError ? (
          <Text className='text-red-500 text-sm'>{deleteError}</Text>
        ) : (
          ''
        )}
      </Modal>
    </div>
  )
}
