import { api } from '../Api'
import { ApacTest } from './types'

export default async function getApac (id: number) {
  return await api.get<GetApacResponse>(`/tests/${id}`)
}

export type GetApacResponse = ApacTest
