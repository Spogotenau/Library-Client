import { useNavigate } from 'react-router-dom'
import Button from '../components/button/button'
import { Text } from '../components/text/text'

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center mt-32'>
      <Text className='text-4xl font-bold text-red-500'>Unerlaubt</Text>
      <Text className='text-2xl font-semibold'>
        Auf diese Seite darft du nicht!
      </Text>
      <Button onClick={() => navigate('/library')} className='mt-4'>
        Zurück zur Startseite!
      </Button>
    </div>
  )
}

export default Unauthorized
