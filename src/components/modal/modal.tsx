import { ReactNode, useState, useEffect } from 'react'
import Button from '../button/button'
import { Text } from '../text/text'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  type: 'delete' | 'create' | 'update' | 'confirmation'
  children: ReactNode
}

const Modal = ({ isOpen, onClose, onSubmit, title, type, children }: Props) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setShowModal(true)
    } else {
      setTimeout(() => setShowModal(false), 300)
    }
  }, [isOpen])

  const actionButtonConfig = {
    delete: {
      text: 'Löschen',
      style: 'bg-red-600 text-white hover:bg-red-700',
    },
    create: {
      text: 'Erstellen',
      style: '',
    },
    update: {
      text: 'Bearbeiten',
      style: '',
    },
    confirmation: {
      text: 'Ja',
      style: '',
    },
  }

  const { text, style } = actionButtonConfig[type] || {
    text: 'Aktion',
    style: '',
  }

  if (!showModal) return null

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-blue-200 p-6 rounded-lg w-1/5 shadow-lg transform transition-all duration-300 ${
          isOpen ? 'translate-y-0' : '-translate-y-10'
        }`}
      >
        <div className='flex justify-between items-center'>
          <Text className='text-xl font-semibold'>{title}</Text>
          <button
            className='text-2xl font-bold text-gray-500 hover:text-gray-700'
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className='mt-2 mb-6'>{children}</div>
        <div className='flex justify-end gap-4'>
          <Button onClick={onClose} styling='secondary'>
            Abbrechen
          </Button>
          <Button onClick={onSubmit} className={`${style}`}>
            {text}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
