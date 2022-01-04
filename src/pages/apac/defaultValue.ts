import { ApacState } from './types'

export const apacDefaultValue: ApacState = {
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
  normalSentenceTest: {
    questionInformationId: '',
    type: 'NORMAL_SENTENCE',
    questionAnswers: []
  }
}
