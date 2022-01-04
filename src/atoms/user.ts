import { atom } from 'recoil'
import { userStorage } from '../libs/storage/user'

export type User = {
  name: string
  accessToken: string
}
console.log(userStorage.get()?.accessToken)
export const user = atom<User | null>({
  key: 'userState',
  default: userStorage.get() || {
    name: '',
    accessToken: ''
  }
})
