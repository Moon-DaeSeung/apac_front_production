import { Answer, ApacTestType, Question } from '../../libs/api/apac/types'

export type ApacUiState = {
  information: InformationProps
  wordTest: SubTestUi
  simpleSentenceTest: SubTestUi
  normalSentenceTest: SubTestUi
  updatedAt: Date
}

export type InformationProps = {
  testeeName: string
  testeeGender: string
  testeeAge: string
  testeeNote: string
  testedDate?: string
}

export type SubTestUi = {
  questionInformationId: string
  type: ApacTestType
  subTestRows: SubTestRow[]
}

export type SubTestRow = {
  question: Question
  answer: Answer
  isTyping: boolean
}
