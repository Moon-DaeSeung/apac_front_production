import { api } from '../Api'
import { ErrorPattern } from './types'

export default async function getErrorPatterns () {
  return await api.get<GetErrorPatternsResponse>('/error-patterns')
}

export type GetErrorPatternsResponse = ErrorPattern[]
