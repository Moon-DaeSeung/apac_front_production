import { ApacTest } from '../api/apac/types'
import storage from './index'
const KEY = 'APAC_'
const getKey = (id: number) => `${KEY}_${id}`
const apac = () => {
  const get = (id: number) => storage.getItem<ApacTest>(getKey(id))
  const set = (id: number, value: ApacTest) => storage.setItem<ApacTest >(getKey(id), value)
  const remove = (id: number) => storage.removeItem(getKey(id))
  return { get, set, remove }
}

const apacStorage = apac()
export default apacStorage
