import { atom } from 'recoil'

export type User = {
  name: string
  getIdToken: () => Promise<string>
}

export const user = atom<User | null>({
  key: 'userState',
  default: { name: '', getIdToken: () => new Promise((resolve) => resolve('')) }
})
