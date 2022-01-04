import { api } from '../Api'
import { SubTest } from './types'

export default async function analyzeErrorPattern (id: number, payload: AnalyzeErrorPatternRequest) {
  return await api.post<AnaylzeErrorPatternResponse>(`/tests/${id}`, payload)
}

export type AnalyzeErrorPatternRequest = SubTest
export type AnaylzeErrorPatternResponse = SubTest
