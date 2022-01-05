import { ApacUiState } from './types'

export const apacDefaultValue: ApacUiState = {
  information: {
    testeeName: '',
    testeeGender: '',
    testeeAge: '',
    testeeNote: ''
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
