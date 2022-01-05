import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth'
import { User } from '../atoms/user'

const firebaseConfig = {
  apiKey: 'AIzaSyAdXtqiLAlMNOkg2ABSSF39P1POFmGjyx0',
  authDomain: 'apac-1c9a5.firebaseapp.com',
  projectId: 'apac-1c9a5',
  storageBucket: 'apac-1c9a5.appspot.com',
  messagingSenderId: '64667817697',
  appId: '1:64667817697:web:8d994ecfbc7abbc6fc09a0',
  measurementId: 'G-5W3JXK84SX'
}

// Initialize Firebase
/* const app = */ initializeApp(firebaseConfig)
type AuthStateChangedEvent = (user: User | null) => void
const actions: AuthStateChangedEvent[] = []
const auth = getAuth()
const resolveUser = (user: FirebaseUser | null) => {
  return user
    ? {
        name: user.email || '',
        getIdToken: async () => await user.getIdToken(false)
      }
    : null
}
const invokeAuthChangeEvent = (user: User | null) => actions.forEach((event) => event(user))
onAuthStateChanged(auth, (firebaseUser) => {
  const user = resolveUser(firebaseUser)
  invokeAuthChangeEvent(user)
})
export const addAuthEventChangedEvent = (event: AuthStateChangedEvent) => actions.push(event)
export const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
export const logout = () => {
  signOut(auth)
}
