import { useEffect } from 'react'
import { api } from '../libs/api/Api'
import { addAuthEventChangedEvent } from '../auth/firebase'
import useUser from './useUser'

export const useAuthInitialize = () => {
  const { setUser } = useUser()
  useEffect(() => {
    addAuthEventChangedEvent((user) => {
      console.log(user?.getIdToken().then(console.log))
      setUser(user)
      api.setTokenResolver(user ? user.getIdToken : null)
    })
  }, [])
}
