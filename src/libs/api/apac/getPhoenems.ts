import { api } from '../Api'
import { Phoneme } from './types'

export default async function getPhonemes (id: string, params: GetPhonemesRequestQuery) {
  return await api.get<GetPhonemesResponse>(`/questions/${id}/phonemes`, { params })
}

export type GetPhonemesRequestQuery = {
  number: number
  reaction: string
}
export type GetPhonemesResponse = Phoneme[]
