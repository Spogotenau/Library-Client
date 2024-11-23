import { useNavigate } from 'react-router-dom'
import { Text } from '../components/text/text'
import Button from '../components/button/button'

type Props = {}

export const NotFound: React.FC<Props> = ({}) => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center mt-32'>
      <Text className='text-4xl font-bold text-red-500'>404</Text>
      <Text className='text-2xl font-semibold'>
        Keine Seite zu dieser URL gefunden
      </Text>
      <Button onClick={() => navigate('/library')} className='mt-4'>
        Zurück zur Startseite!
      </Button>
    </div>
  )
}
