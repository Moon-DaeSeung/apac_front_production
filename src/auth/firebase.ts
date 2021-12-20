// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, setPersistence, browserLocalPersistence } from 'firebase/auth'

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
type LoginEvent = (credential: UserCredential) => void
const loginEvents: LoginEvent[] = []
const logoutEvents: (() => void)[] = []
const auth = getAuth()
setPersistence(auth, browserLocalPersistence)
const invokeLoginEvent = (credential: UserCredential) => loginEvents.forEach((event) => event(credential))
export const addLoginEvent = (event: LoginEvent) => loginEvents.push(event)
export const addLogoutEvent = (event: () => void) => logoutEvents.push(event)
export const signup = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then(invokeLoginEvent)
export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
    .then(invokeLoginEvent)
export const logout = () => signOut(auth).then(() => { logoutEvents.forEach(event => event()) })
