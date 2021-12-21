import { useRecoilState } from 'recoil'
import { user as userState } from '../atoms/user'

export default function useUser () {
  const [user, setUser] = useRecoilState(userState)
  return {
    user,
    setUser
  }
}
