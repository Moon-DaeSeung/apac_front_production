import { useEffect } from 'react'
import { api } from '../libs/api/Api'
import { addAuthEventChangedEvent } from '../auth/firebase'
import useUser from './useUser'
import { userStorage } from '../libs/storage/user'

export const useAuthInitialize = () => {
  const { setUser, user: cachedUser } = useUser()
  useEffect(() => {
    if (cachedUser) {
      api.setTokenResolver(() => cachedUser.accessToken)
    }
    addAuthEventChangedEvent((user) => {
      setUser(user)
      api.setTokenResolver(user ? () => user.accessToken : null)
      userStorage.set(user)
    })
  }, [])
}
