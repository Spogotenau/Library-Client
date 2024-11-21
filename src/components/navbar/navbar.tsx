import {
  faBook,
  faCircleUser,
  faHouse,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/auth-context'
import Modal from '../modal/modal'
import { Text } from '../text/text'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className='group fixed h-full bg-purple-900 text-blue-200 transition-all duration-1000 ease-in-out'>
      <div className='flex flex-col justify-between p-4 h-full'>
        <div className='flex flex-col gap-32'>
          <FontAwesomeIcon icon={faBook} className='text-3xl' />
          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-4'>
              <div className='flex flex-col items-center w-10'>
                <FontAwesomeIcon icon={faHouse} className='text-3xl' />
              </div>

              <Link
                to={'/library'}
                className='hidden group-hover:inline text-lg hover:underline'
              >
                Home
              </Link>
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex flex-col items-center w-10'>
                <FontAwesomeIcon icon={faCircleUser} className='text-3xl' />
              </div>
              <Link
                to={`/library/user/${user}`}
                className='hidden group-hover:inline text-lg hover:underline'
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col items-center w-10'>
            <FontAwesomeIcon icon={faRightFromBracket} className='text-3xl' />
          </div>
          <span
            onClick={toggleModal}
            className='hidden group-hover:inline text-lg hover:underline hover:cursor-pointer'
          >
            Logout
          </span>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onSubmit={logout}
        onClose={toggleModal}
        type='confirmation'
        title='Abmelden'
      >
        <Text className='text-sm'>Wirklich ausloggen?</Text>
      </Modal>
    </div>
  )
}

export default Navbar
