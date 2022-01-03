export type Phoneme = {
  target: string
  react: string
  distortion: string
  location: number
  wordLocation: number
  questionNumber: number
  computedErrorPatterns: ErrorPattern[]
  confirmedErrorPatterns: ErrorPattern[]
}

export type ErrorPattern = {
  id: number
  name: string
}

export type TotalErrorPattern = {
  total: number
  errorPattern: ErrorPattern
}

export type ApacTestType = 'WORD' | 'SIMPLE_SENTENCE' | 'NORMAL_SENTENCE'
export type AnswerState = 'NOT_WRITTEN' | 'ERROR' | 'COMPLETE' | 'NOT_CONFIRMED'

export type TestInformation = {
  id: number
  testeeName: string
  testeeGender: string
  testeeAge: string
  testeeNote: string
  testedDate: string | null
}

export type Answer = {
  number: number
  reaction: string
  phonemes: Phoneme[]
  note: string
  state: AnswerState
  totalErrorPatterns: TotalErrorPattern[]
}

export type SubTest = {
  questionInformationId: String
  type: ApacTestType
  answers: Answer[]
}

export type Question = {
  number: number
  name: string
  target: string
  defaultPhonemes: Phoneme[]
}

export type QuestionInformation = {
  id: string
  type: ApacTestType
  questions: Question[]
}
