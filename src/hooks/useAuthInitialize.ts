import { getAuth } from 'firebase/auth'
import { useEffect } from 'react'
import { addLoginEvent, addLogoutEvent } from '../auth/firebase'
import useUser from './useUser'

export const useAuthInitialize = () => {
  const { setUser } = useUser()
  useEffect(() => {
    const auth = getAuth()
    setUser(auth.currentUser)
    addLoginEvent((credential) => {
      setUser(credential.user)
    })
    addLogoutEvent(() => {
      setUser(null)
    })
  }, [])
}
