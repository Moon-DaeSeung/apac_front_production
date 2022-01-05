import { useEffect } from 'react'
import { api } from '../libs/api/Api'
import { addAuthEventChangedEvent, initializeAuth } from '../auth/firebase'
import useUser from './useUser'
import { userStorage } from '../libs/storage/user'

export const useAuthInitialize = () => {
  const { setUser } = useUser()
  useEffect(() => {
    addAuthEventChangedEvent((user) => {
      setUser(user)
      api.setTokenResolver(user ? user.getIdToken : null)
      user
        ? user.getIdToken().then(idToken => {
          userStorage.set({ name: user.name, idToken })
        })
        : userStorage.set(null)
    })
    initializeAuth()
  }, [])
}
