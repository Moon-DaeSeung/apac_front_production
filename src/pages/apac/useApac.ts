import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useErrorPatternOptions from '../../hooks/useErrorPatternOptions'
import { createApac, getApac, getErrorPatterns, getLatestQuestionInformation, getQuestionInformation, patchApac } from '../../libs/api/apac'
import { QuestionInformation, ApacTest, SubTest } from '../../libs/api/apac/types'
import apacStorage from '../../libs/storage/apac'
import { ApacUiState, SubTestUi } from './types'
type UseApacProps = {
  defaultValue: ApacUiState
  id?: number
}

export type SaveType = 'information' | Exclude<keyof ApacUiState, 'information'>

export const useApac = ({ defaultValue, id }: UseApacProps) => {
  const [apacUiState, setApacUiState] = useState<ApacUiState>(defaultValue)
  const [apacServerState, setApacServerState] = useState<ApacTest | null>(null)
  const {
    wordTest: { questionInformationId: wordQuestinoId },
    simpleSentenceTest: { questionInformationId: simpleQuestionId },
    normalSentenceTest: { questionInformationId: normalQuestionId }
  } = apacUiState

  useEffect(() => {
    if (!id || !apacServerState || !wordQuestinoId || !simpleQuestionId || !normalQuestionId) return
    const cache: ApacTest = {
      id,
      ...apacUiState.information,
      ...transUiToServer('wordTest'),
      ...transUiToServer('normalSentenceTest'),
      ...transUiToServer('simpleSentenceTest')
    }
    apacStorage.set(id, cache)
  }, [apacUiState])

  useEffect(() => {
    if (!id || !apacServerState || !wordQuestinoId || !simpleQuestionId || !normalQuestionId) return
    const { wordTest, simpleSentenceTest, normalSentenceTest, ...information } = apacServerState
    setApacUiState((prev) => {
      return {
        information,
        wordTest: { ...prev.wordTest, ...updateServerToUi(prev.wordTest, wordTest) },
        simpleSentenceTest: { ...prev.simpleSentenceTest, ...updateServerToUi(prev.simpleSentenceTest, simpleSentenceTest) },
        normalSentenceTest: { ...prev.normalSentenceTest, ...updateServerToUi(prev.normalSentenceTest, normalSentenceTest) }
      }
    })
  }, [apacServerState, wordQuestinoId, simpleQuestionId, normalQuestionId])

  const updateServerToUi = (subTestUi: SubTestUi, subTestServer?: SubTest | null) => {
    if (!subTestServer) return {}
    const { questionAnswers } = subTestUi
    const { answers } = subTestServer
    if (answers.length !== questionAnswers.length) { console.error(`questionAnswers and answers could not be ziped. questions: ${questionAnswers.length} answers: ${answers.length}`) }
    return {
      questionAnswers: questionAnswers.map(({ question }, i) => ({ question, answer: answers[i] }))
    }
  }

  const { setErrorPatternOptions } = useErrorPatternOptions()

  useEffect(() => {
    getErrorPatterns().then(setErrorPatternOptions)
  }, [])

  const initialize = (data: ApacTest) => {
    setApacServerState(data)
    const { wordTest, simpleSentenceTest, normalSentenceTest } = data
    const wordPromise = wordTest ? getQuestionInformation(wordTest.questionInformationId.toString()) : getLatestQuestionInformation({ type: 'WORD' })
    const simplePromise = simpleSentenceTest ? getQuestionInformation(simpleSentenceTest.questionInformationId.toString()) : getLatestQuestionInformation({ type: 'SIMPLE_SENTENCE' })
    const normalPromise = normalSentenceTest ? getQuestionInformation(normalSentenceTest.questionInformationId.toString()) : getLatestQuestionInformation({ type: 'NORMAL_SENTENCE' })
    wordPromise.then(updateQuestionInfo('wordTest'))
    simplePromise.then(updateQuestionInfo('simpleSentenceTest'))
    normalPromise.then(updateQuestionInfo('normalSentenceTest'))
  }

  useEffect(() => {
    if (id) {
      const cahced = apacStorage.get(id)
      cahced ? initialize(cahced) : getApac(id).then(initialize)
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
            return { question, answer: { number, reaction: '', note: '', phonemes, totalErrorPatterns: [], state: 'NOT_WRITTEN' } }
          })
        }
      }
    })
  }

  const navigation = useNavigate()

  const handleSave = (type: SaveType) => {
    let promise: Promise<ApacTest>
    switch (type) {
      case 'information':
        promise = id
          ? patchApac(id, { ...apacUiState.information })
          : createApac({ ...apacUiState.information })
        break
      default:
        promise = patchApac(id!!, transUiToServer(type))
    }
    promise.then(data => {
      id || navigation(`./${data.id}/word`)
      id && apacStorage.remove(id)
      alert('저장하였습니다.')
    }).catch(() => {
      alert('저장에 실패하였습니다. 다시 시도해주세요')
    })
  }

  const transUiToServer = (testType: Exclude<keyof ApacUiState, 'information'>) => {
    return {
      [testType]: {
        questionInformationId: apacUiState[testType].questionInformationId,
        type: apacUiState[testType].type,
        answers: apacUiState[testType].questionAnswers.map(({ answer }) => answer)
      }
    }
  }

  return { apacUiState, setApacUiState, handleSave }
}
