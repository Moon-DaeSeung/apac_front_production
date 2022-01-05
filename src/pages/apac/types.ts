import { Answer, ApacTestType, Question } from '../../libs/api/apac/types'

export type ApacUiState = {
  information: InformationProps
  wordTest: TestProps
  simpleSentenceTest: TestProps
  normalSentenceTest: TestProps
}

export type InformationProps = {
  testeeName: string
  testeeGender: string
  testeeAge: string
  testeeNote: string
  testedDate: string | null
}

export type TestProps = {
  questionInformationId: string
  type: ApacTestType
  questionAnswers: QuestionAnswer[]
}

export type QuestionAnswer = {
  question: Question
  answer: Answer
}
