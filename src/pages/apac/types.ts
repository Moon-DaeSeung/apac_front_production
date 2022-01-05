import { Answer, ApacTestType, Question } from '../../libs/api/apac/types'

export type ApacUiState = {
  information: InformationProps
  wordTest: SubTestUi
  simpleSentenceTest: SubTestUi
  normalSentenceTest: SubTestUi
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
  questionAnswers: QuestionAnswer[]
}

export type QuestionAnswer = {
  question: Question
  answer: Answer
}
