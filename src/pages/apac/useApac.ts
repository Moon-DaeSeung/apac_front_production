import { useState } from 'react'
import { ApacTestType, Question } from 'src/api/types'
import { Answer } from 'src/lib/api/types'

export const useApac = () => {
  const defaultValue: ApacState = {
    information: {
      testeeName: '',
      testeeGender: '',
      testeeAge: '',
      testeeNote: '',
      testedDate: null
    },
    wordTest: {
      questionInformationId: '',
      type: 'WORD',
      questionAnswers: []
    },
    simpleSentenceTest: {
      questionInformationId: '',
      type: 'SIMPLE_SENTENCE',
      questionAnswers: []
    },
    normalSentenceTert: {
      questionInformationId: '',
      type: 'NORMAL_SENTENCE',
      questionAnswers: []
    }
  }
  const [apacState, setApacState] = useState<ApacState>(defaultValue)
}

type ApacState = {
  information: Information
  wordTest: Test
  simpleSentenceTest: Test
  normalSentenceTert: Test
}

type Information = {
  testeeName: string
  testeeGender: string
  testeeAge: string
  testeeNote: string
  testedDate: string | null
}

type Test = {
  questionInformationId: string
  type: ApacTestType
  questionAnswers: QuestionAnswer[]
}

type QuestionAnswer = {
  question: Question
  answer: Answer
}
