import { useEffect, useState } from 'react'
import useErrorPatternOptions from 'src/hooks/useErrorPatternOptions'
import { getApac, getErrorPatterns } from '../../libs/api/apac'
import { Answer, QuestionInformation, ApacTest } from '../../libs/api/apac/types'
import { ApacState, QuestionAnswer } from './types'
type UseApacProps = {
  defaultValue: ApacState
  id?: number
}

export const useApac = ({ defaultValue, id }: UseApacProps) => {
  const [apacUiState, setApacUiState] = useState<ApacState>(defaultValue)
  const [apacServerState, setApacServerState] = useState<ApacTest | null>(null)
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

  const { setErrorPatternOptions } = useErrorPatternOptions()
  useEffect(() => {
    getErrorPatterns().then(setErrorPatternOptions)
  }, [])

  useEffect(() => {
    // router context exsits -> return
    if (!id) return
    getApac(id).then(setApacServerState)
  }, [id])

  return { apacUiState, setApacUiState }
}
