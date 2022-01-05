import { useEffect, useState } from 'react'
import useErrorPatternOptions from '../../hooks/useErrorPatternOptions'
import { getApac, getErrorPatterns, getLatestQuestionInformation, getQuestionInformation } from '../../libs/api/apac'
import { QuestionInformation, ApacTest, SubTest } from '../../libs/api/apac/types'
import { ApacUiState, TestProps as SubTestUi } from './types'
type UseApacProps = {
  defaultValue: ApacUiState
  id?: number
}

export const useApac = ({ defaultValue, id }: UseApacProps) => {
  const [apacUiState, setApacUiState] = useState<ApacUiState>(defaultValue)
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
        wordTest: { ...prev.wordTest, ...updateQuestionAnswers(prev.wordTest, wordTest) },
        simpleSentenceTest: { ...prev.simpleSentenceTest, ...updateQuestionAnswers(prev.simpleSentenceTest, simpleSentenceTest) },
        normalSentenceTest: { ...prev.normalSentenceTest, ...updateQuestionAnswers(prev.normalSentenceTest, normalSentenceTest) }
      }
    })
  }, [apacServerState, wordQuestinoId, simpleQuestionId, normalQuestionId])

  const updateQuestionAnswers = (subTestUi: SubTestUi, subTestServer?: SubTest | null) => {
    if (!subTestServer) return {}
    const { questionAnswers } = subTestUi
    const { answers } = subTestServer
    if (answers.length !== questionAnswers.length) { console.error(`questionAnswers and answers could not be ziped. questions: ${questionAnswers.length} answers: ${answers.length}`) }
    return questionAnswers.map(({ question }, i) => ({ question, answer: answers[i] }))
  }

  const { setErrorPatternOptions } = useErrorPatternOptions()

  useEffect(() => {
    getErrorPatterns().then(setErrorPatternOptions)
  }, [])

  useEffect(() => {
    // router context exsits -> return
    if (id) {
      getApac(id).then(data => {
        setApacServerState(data)
        const { wordTest, simpleSentenceTest, normalSentenceTest } = data
        const wordPromise = wordTest ? getQuestionInformation(wordTest.questionInformationId.toString()) : getLatestQuestionInformation({ type: 'WORD' })
        const simplePromise = simpleSentenceTest ? getQuestionInformation(simpleSentenceTest.questionInformationId.toString()) : getLatestQuestionInformation({ type: 'SIMPLE_SENTENCE' })
        const normalPromise = normalSentenceTest ? getQuestionInformation(normalSentenceTest.questionInformationId.toString()) : getLatestQuestionInformation({ type: 'NORMAL_SENTENCE' })
        wordPromise.then(updateQuestionInfo('wordTest'))
        simplePromise.then(updateQuestionInfo('simpleSentenceTest'))
        normalPromise.then(updateQuestionInfo('normalSentenceTest'))
      })
    } else {
      getLatestQuestionInformation({ type: 'WORD' }).then(updateQuestionInfo('wordTest'))
      getLatestQuestionInformation({ type: 'SIMPLE_SENTENCE' }).then(updateQuestionInfo('simpleSentenceTest'))
      getLatestQuestionInformation({ type: 'NORMAL_SENTENCE' }).then(updateQuestionInfo('normalSentenceTest'))
    }
  }, [id])

  const updateQuestionInfo = (testType: Exclude<keyof ApacUiState, 'information'>) => ({ questions, id: questionId, type }: QuestionInformation) => {
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

  return { apacUiState, setApacUiState }
}
