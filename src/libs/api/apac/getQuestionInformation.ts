import { api } from '../Api'
import { QuestionInformation } from './types'

export default async function getQuestionInformation (id: string) {
  return await api.get<GetQuestionInformationResponse>(`/questions/${id}`)
}

export type GetQuestionInformationResponse = QuestionInformation
