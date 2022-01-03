import { Phoneme } from '../../api/types'
import { ApacState } from './types'

const temp: Phoneme[] = [
  { target: 'ㄸ', react: 'ㅌ', distortion: '', confirmedErrorPatterns: [{ name: '음절반복', id: 3 }, { name: '도치', id: 4 }], computedErrorPatterns: [{ name: '연구개음', id: 1 }, { name: '도치', id: 4 }], location: 0, wordLocation: 0, questionNumber: 1 },
  { target: 'ㅏ', react: 'ㅏ', distortion: '', confirmedErrorPatterns: [], computedErrorPatterns: [], location: 0, wordLocation: 0, questionNumber: 1 },
  { target: 'ㄹ', react: 'ㄹ', distortion: '', confirmedErrorPatterns: [], computedErrorPatterns: [], location: 0, wordLocation: 0, questionNumber: 1 },
  { target: 'ㄱ', react: 'ㄱ', distortion: '', confirmedErrorPatterns: [], computedErrorPatterns: [], location: 0, wordLocation: 0, questionNumber: 1 },
  { target: 'ㅣ', react: 'ㅣ', distortion: '', confirmedErrorPatterns: [], computedErrorPatterns: [], location: 0, wordLocation: 0, questionNumber: 1 },
  { target: '-', react: '-', distortion: '', confirmedErrorPatterns: [], computedErrorPatterns: [], location: 0, wordLocation: 0, questionNumber: 1 }
]

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
    questionAnswers: [
      {
        question: { number: 1, name: '포도', target: '포도', defaultPhonemes: temp },
        answer: { number: 1, phonemes: temp, reaction: '', note: '', state: 'NOT_WRITTEN', totalErrorPatterns: [{ total: 1, errorPattern: { name: '연구개음', id: 1 } }, { total: 3, errorPattern: { name: '음절반복', id: 3 } }] }
      }
    ]
  },
  simpleSentenceTest: {
    questionInformationId: '',
    type: 'SIMPLE_SENTENCE',
    questionAnswers: [{
      question: { number: 1, name: '포도', target: '포도', defaultPhonemes: temp },
      answer: { number: 1, phonemes: temp, reaction: '', note: '', state: 'NOT_WRITTEN', totalErrorPatterns: [] }
    }]
  },
  normalSentenceTest: {
    questionInformationId: '',
    type: 'NORMAL_SENTENCE',
    questionAnswers: [{
      question: { number: 1, name: '포도', target: '포도', defaultPhonemes: temp },
      answer: { number: 1, phonemes: temp, reaction: '', note: '', state: 'NOT_WRITTEN', totalErrorPatterns: [] }
    }]
  }
}
