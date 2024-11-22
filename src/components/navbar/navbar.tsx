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
    <div className='group fixed h-full w-16 bg-purple-900 text-blue-200 hover:w-40 transition-[width] duration-300 ease-in-out'>
      <div className='flex flex-col justify-between p-3 h-full'>
        <div className='flex flex-col gap-32'>
          <div className='flex justify-center'>
            <FontAwesomeIcon icon={faBook} className='text-3xl' />
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-4'>
              <FontAwesomeIcon
                icon={faHouse}
                className='text-3xl min-w-[40px] text-center'
              />
              <Link
                to={'/library'}
                className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-lg hover:underline whitespace-nowrap overflow-hidden'
              >
                Home
              </Link>
            </div>
            <div className='flex items-center gap-4'>
              <FontAwesomeIcon
                icon={faCircleUser}
                className='text-3xl min-w-[40px] text-center'
              />
              <Link
                to={`/library/user/${user}`}
                className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-lg hover:underline whitespace-nowrap overflow-hidden'
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className='text-3xl min-w-[40px] text-center'
          />
          <span
            onClick={toggleModal}
            className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-lg hover:underline hover:cursor-pointer whitespace-nowrap overflow-hidden'
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
