import { useParams } from 'react-router-dom'

const ProfilePage = () => {
  const { username } = useParams()

  return <>{username}</>
}

export default ProfilePage
