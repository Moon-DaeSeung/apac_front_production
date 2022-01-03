import { useEffect, useState } from 'react'
import { Answer, Question, QuestionInformation, TestInformationDetail } from '../../api/types'
import { ApacState, QuestionAnswer } from './types'
type UseApacProps = {
  defaultValue: ApacState
  id?: number
}

export const useApac = ({ defaultValue, id }: UseApacProps) => {
  const [apacUiState, setApacUiState] = useState<ApacState>(defaultValue)
  const [apacServerState, setApacServerState] = useState<TestInformationDetail | null>(null)
  const {
    wordTest: { questionInformationId: wordQuestinoId },
    simpleSentenceTest: { questionInformationId: simpleQuestionId },
    normalSentenceTest: { questionInformationId: normalQuestionId }
  } = apacUiState

  useEffect(() => {
    if (!apacServerState || !wordQuestinoId || !simpleQuestionId || !normalQuestionId) return
    const { wordTest, simpleSentenceTest, normalSentenceTest, id, ...information } = apacServerState
    setApacUiState((prev) => {
      return {
        information,
        wordTest: { ...prev.wordTest, ...updateQuestionAnswers(prev.wordTest.questionAnswers, wordTest.answers) },
        simpleSentenceTest: { ...prev.simpleSentenceTest, ...updateQuestionAnswers(prev.simpleSentenceTest.questionAnswers, simpleSentenceTest.answers) },
        normalSentenceTest: { ...prev.normalSentenceTest, ...updateQuestionAnswers(prev.normalSentenceTest.questionAnswers, normalSentenceTest.answers) }
      }
    })
  }, [apacServerState, wordQuestinoId, simpleQuestionId, normalQuestionId])

  const updateQuestionInfo = (testType: Exclude<keyof ApacState, 'information'>, { questions, id: questionId, type }: QuestionInformation) => {
    setApacUiState((prev) => {
      return {
        ...prev,
        [testType]: {
          type,
          questionInformationId: questionId,
          questionAnswers: questions.map((question) => {
            const { number, defaultPhonemes: phonemes } = question
            return { question, answer: { number, reaction: '', note: '', phonemes, totalErrorPatterns: [] } }
          })
        }
      }
    })
  }

  const updateQuestionAnswers = (questionAnswers: QuestionAnswer[], answers: Answer[]) => {
    if (answers.length !== questionAnswers.length) {
      console.error(`questionAnswers and answers could not be ziped. questions: ${questionAnswers.length} answers: ${answers.length}`)
    }
    return questionAnswers.map(({ question }, i) => {
      return { question, answer: answers[i] }
    })
  }

  useEffect(() => {
    // router context exsits -> return
    if (id) {
      console.log('answer loading')
      console.log('question loading')
      console.log('합체')
    } else {
      console.log('question loadinng')
    }
  }, [id])

  return { apacUiState, setApacUiState }
}
