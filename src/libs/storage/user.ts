import storage from './index'

const KEY = 'user'

type User = {
  name: string
  idToken: string
}

function UserStorage () {
  const get = () => storage.getItem<User>(KEY)
  const set = (value: User | null) => storage.setItem<User | null>(KEY, value)

  return {
    get, set
  }
}

export const userStorage = UserStorage()
