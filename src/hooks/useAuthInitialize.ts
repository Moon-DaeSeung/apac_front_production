import { useEffect } from 'react'
import { addAuthEventChangedEvent } from '../auth/firebase'
import useUser from './useUser'

export const useAuthInitialize = () => {
  const { setUser } = useUser()
  useEffect(() => {
    addAuthEventChangedEvent((user) => {
      setUser(user)
    })
  }, [])
}
