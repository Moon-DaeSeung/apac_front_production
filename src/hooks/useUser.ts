import { useRecoilState } from 'recoil'
import { userState } from '../atoms/userState'

export default function useUser () {
  const [user, setUser] = useRecoilState(userState)
  return {
    user,
    setUser
  }
}
