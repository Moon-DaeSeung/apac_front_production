import { api } from '../Api'
import { Phoneme, TotalErrorPattern } from './types'
const calculateTotalErrorPatterns = async (payload: CalculateTotalErrorPatternsRequest) => {
  return await api.post<CalculateTotalErrorPatternsResponse>('/total-error-patterns', payload)
}

export default calculateTotalErrorPatterns

export type CalculateTotalErrorPatternsRequest = Phoneme[]
export type CalculateTotalErrorPatternsResponse = TotalErrorPattern[]
