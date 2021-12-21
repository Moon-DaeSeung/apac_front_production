import { atom } from 'recoil'

export type User = {
  name: string
  accessToken: string
}

export const user = atom<User | null>({
  key: 'userState',
  default: {
    name: '',
    accessToken: ''
  }
})
