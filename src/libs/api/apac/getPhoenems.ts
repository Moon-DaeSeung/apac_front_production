import { api } from '../Api'
import { GetAllApacRequestQuery } from './getAllApac'
import { Phoneme } from './types'

export default async function getPhonemes (params: GetAllApacRequestQuery) {
  return await api.post<GetPhonemesResponse>('/tests', { params })
}

export type GetPhonemesRequestQuery = {
  number: number
  reaction: string
}
export type GetPhonemesResponse = Phoneme[]
