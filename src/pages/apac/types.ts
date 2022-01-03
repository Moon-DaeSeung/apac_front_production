import { Answer, ApacTestType, Question } from '../../api/types'

export type ApacState = {
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
