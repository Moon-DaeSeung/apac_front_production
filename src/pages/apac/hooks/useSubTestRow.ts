import { useEffect, useState } from 'react'
import useDebounce from '../../../hooks/useDebouce'
import { calcaulateTotalErrorPatterns, getPhonemes } from '../../../libs/api/apac'
import { Answer, AnswerState, Phoneme, TotalErrorPattern } from '../../../libs/api/apac/types'
import { ServerError } from '../../../libs/api/Api'
import { SubTestRow } from '../types'

export type SubTestRowProps = {
  value: SubTestRow
  onChange: (value: SubTestRow) => void
  questionId: string
}

const useSubTestRow = ({ value, onChange, questionId }: SubTestRowProps) => {
  const [isPendingTotalErrorPattern, setIsPendingTotalErrorPattern] = useState(false)
  const { question, answer, isTyping } = value
  const handleChange = (key: keyof Answer) => (item: string | Phoneme[] | TotalErrorPattern[]) => {
    key === 'phonemes' && setIsPendingTotalErrorPattern(true)
    onChange({ ...value, isTyping: key === 'reaction' ? true : value.isTyping, answer: { ...value.answer, [key]: item } })
  }
  const resolvePhonemes = (phonemes: Phoneme[], state: AnswerState = 'COMPLETE', errorMessage = '') => {
    onChange({ ...value, isTyping: false, answer: { ...value.answer, phonemes, state, errorMessage, totalErrorPatterns: [] } })
  }

  const handleGetPhonemes = useDebounce((number: number, reaction: string) => {
    const { defaultPhonemes } = question
    switch (reaction) {
      case '':
        resolvePhonemes(defaultPhonemes, 'NOT_WRITTEN')
        break
      case '+':
        resolvePhonemes(defaultPhonemes.map(value => ({ ...value, react: value.target })))
        break
      case '-':
        resolvePhonemes(defaultPhonemes, 'NO_RESPONSE')
        break
      default:
        getPhonemes(questionId, { reaction, number })
          .then(data => { resolvePhonemes(data) })
          .catch((error: Error) => {
            let message = '잘못된 아동 반응입니다.'
            if (error instanceof ServerError) { message = error.message }
            resolvePhonemes(defaultPhonemes, 'ERROR', message)
          })
    }
  }
  , 300)

  useEffect(() => {
    if (!isTyping) return
    handleGetPhonemes(question.number, answer.reaction)
  }, [answer.reaction, isTyping])

  useEffect(() => {
    if (!isPendingTotalErrorPattern) return
    calcaulateTotalErrorPatterns(answer.phonemes)
      .then(data => {
        setIsPendingTotalErrorPattern(false)
        handleChange('totalErrorPatterns')(data)
      })
  }, [answer.phonemes, isPendingTotalErrorPattern])

  return { handleChange }
}

export default useSubTestRow
