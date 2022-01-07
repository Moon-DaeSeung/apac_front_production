import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useErrorPatternOptions from '../../hooks/useErrorPatternOptions'
import { analyzeErrorPattern, createApac, getApac, getErrorPatterns, getLatestQuestionInformation, getQuestionInformation, patchApac } from '../../libs/api/apac'
import { QuestionInformation, ApacTest, SubTest } from '../../libs/api/apac/types'
import apacStorage from '../../libs/storage/apac'
import { ApacUiState, SubTestRow, SubTestUi } from './types'

type UseApacProps = {
  defaultValue: ApacUiState
  id?: number
}

export type SaveType = 'information' | TestType
export type TestType = Exclude<keyof ApacUiState, 'information' | 'updatedAt'>

export const useApac = ({ defaultValue, id }: UseApacProps) => {
  const [apacUiState, setApacUiState] = useState<ApacUiState>(defaultValue)
  const [apacServerState, setApacServerState] = useState<ApacTest | null>(null)
  const [isAllLoadedQuestionInfo, setIsAllLoadedQuestionInfo] = useState(false)
  const {
    wordTest: { questionInformationId: wordQuestinoId },
    simpleSentenceTest: { questionInformationId: simpleQuestionId },
    normalSentenceTest: { questionInformationId: normalQuestionId }
  } = apacUiState

  useEffect(() => {
    if (!wordQuestinoId || !simpleQuestionId || !normalQuestionId) return
    setIsAllLoadedQuestionInfo(true)
  }, [wordQuestinoId, simpleQuestionId, normalQuestionId])

  useEffect(() => {
    if (!id || !isAllLoadedQuestionInfo) return
    const cache: ApacTest = {
      id,
      updatedAt: apacUiState.updatedAt,
      ...apacUiState.information,
      wordTest: { ...transUiToServer('wordTest') },
      normalSentenceTest: { ...transUiToServer('normalSentenceTest') },
      simpleSentenceTest: { ...transUiToServer('simpleSentenceTest') }
    }
    apacStorage.set(id, cache)
  }, [apacUiState, isAllLoadedQuestionInfo])

  useEffect(() => {
    if (!apacServerState || !isAllLoadedQuestionInfo) return
    const { wordTest, simpleSentenceTest, normalSentenceTest, updatedAt, ...information } = apacServerState
    setApacUiState((prev) => {
      return {
        updatedAt,
        information,
        wordTest: { ...prev.wordTest, ...updateServerToUi(prev.wordTest, wordTest) },
        simpleSentenceTest: { ...prev.simpleSentenceTest, ...updateServerToUi(prev.simpleSentenceTest, simpleSentenceTest) },
        normalSentenceTest: { ...prev.normalSentenceTest, ...updateServerToUi(prev.normalSentenceTest, normalSentenceTest) }
      }
    })
  }, [apacServerState, isAllLoadedQuestionInfo])

  const updateServerToUi = (subTestUi: SubTestUi, subTestServer?: SubTest | null) => {
    if (!subTestServer) return {}
    const { subTestRows: subTestRow } = subTestUi
    const { answers } = subTestServer
    if (answers.length !== subTestRow.length) { console.error(`questionAnswers and answers could not be ziped. questions: ${subTestRow.length} answers: ${answers.length}`) }
    return {
      subTestRows: subTestRow.map((hi, i) => ({ ...hi, answer: answers[i] }))
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
    if (!id) return
    setIsAllLoadedQuestionInfo(false)
    const cahced = apacStorage.get(id)
    if (!cahced) { getApac(id).then(initialize); return }
    getApac(id).then(data => {
      cahced.updatedAt > data.updatedAt ? initialize(cahced) : initialize(data)
    })
  }, [id])

  const updateQuestionInfo = (testType: TestType) => ({ questions, id: questionId, type }: QuestionInformation) => {
    setApacUiState((prev) => {
      return {
        ...prev,
        [testType]: {
          type,
          questionInformationId: questionId,
          subTestRows: questions.map((question) => {
            const { number, defaultPhonemes: phonemes } = question
            return { isTyping: false, question, answer: { number, reaction: '', note: '', phonemes, totalErrorPatterns: [], state: 'NOT_WRITTEN', errorMessage: '' } }
          })
        }
      }
    })
  }

  const navigation = useNavigate()

  const handleSave = (type: SaveType) => () => {
    let promise: Promise<ApacTest>
    switch (type) {
      case 'information':
        promise = id
          ? patchApac(id, { ...apacUiState.information })
          : createApac({ ...apacUiState.information })
        break
      default:
        promise = patchApac(id!!, { [type]: transUiToServer(type) })
    }
    promise.then(data => {
      id || navigation(`./${data.id}/word`)
      id && apacStorage.remove(id)
      alert('저장하였습니다.')
    }).catch(() => {
      alert('저장에 실패하였습니다. 다시 시도해주세요')
    })
  }

  const transUiToServer = (testType: TestType) => {
    return {
      questionInformationId: apacUiState[testType].questionInformationId,
      type: apacUiState[testType].type,
      answers: apacUiState[testType].subTestRows.map(({ answer }) => answer)
    }
  }

  const handleSubTestChange = useCallback((testType: TestType) => {
    const { subTestRows } = apacUiState[testType]
    return subTestRows.map((_, index) => (subTestRow: SubTestRow) => {
      setApacUiState(prev => {
        const copied = [...prev[testType].subTestRows]
        copied[index] = subTestRow
        return { ...prev, updatedAt: new Date(), [testType]: { ...prev[testType], subTestRows: copied } }
      })
    })
  }, [isAllLoadedQuestionInfo])

  const handleAllAnswerCheck = (testType: TestType) => () => {
    setApacUiState(prev => {
      const allChecked = prev[testType].subTestRows.map((row) =>
        ({ ...row, isTyping: row.answer.reaction ? row.isTyping : true, answer: { ...row.answer, reaction: row.answer.reaction || '+' } }))
      return { ...prev, [testType]: { ...prev[testType], subTestRows: allChecked } }
    })
  }

  const handleErrorPatternAnalyze = (testType: TestType) => () => {
    analyzeErrorPattern(id!!, transUiToServer(testType))
      .then(data =>
        setApacServerState(prev => {
          return { ...prev!!, [testType]: data }
        })
      ).catch(() => alert('오류패턴 분석에 실패하였습니다'))
  }

  return {
    apacUiState,
    setApacUiState,
    handleSave,
    handleSubTestChange,
    handleAllAnswerCheck,
    handleErrorPatternAnalyze
  }
}
