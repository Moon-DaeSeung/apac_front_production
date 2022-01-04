import { api } from '../Api'
import { ApacTestType, QuestionInformation } from './types'

export default async function getLatestQuestionInformation (params: GetLatestQuestionInformaitonRequestQuery) {
  return await api.get<GetLatestQuestionInformationResponse>('/questions', { params })
}

export type GetLatestQuestionInformationResponse = QuestionInformation
export type GetLatestQuestionInformaitonRequestQuery = { type: ApacTestType }
