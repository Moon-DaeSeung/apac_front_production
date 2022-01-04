import { api } from '../Api'
import { ApacTest } from './types'

export default async function createApac (payload: CreateApacRequest) {
  return await api.post<CreateApacResponse>('/tests', payload)
}

export type CreateApacRequest = {
  testeeName: string
  testeeGender: string
  testeeAge: string
  testeeNote: string
  testedDate: string
}

export type CreateApacResponse = ApacTest
