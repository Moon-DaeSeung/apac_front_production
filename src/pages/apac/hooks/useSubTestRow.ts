import { useEffect } from 'react'
import useDebounce from '../../../hooks/useDebouce'
import { getPhonemes } from '../../../libs/api/apac'
import { Answer, AnswerState, Phoneme } from '../../../libs/api/apac/types'
import { SubTestRow } from '../types'

export type SubTestRowProps = {
  value: SubTestRow
  onChange: (value: SubTestRow) => void
  questionId: string
}

const useSubTestRow = ({ value, onChange, questionId }: SubTestRowProps) => {
  const { question, answer, isTyping } = value
  const handleChange = (key: keyof Answer) => (item: string | Phoneme[]) => {
    onChange({ ...value, isTyping: key === 'reaction' ? true : value.isTyping, answer: { ...value.answer, [key]: item } })
  }
  const resolvePhonemes = (phonemes: Phoneme[], state: AnswerState, errorMessage = '') =>
    onChange({ ...value, isTyping: false, answer: { ...value.answer, phonemes, state, errorMessage } })

  const handleGetPhonemes = useDebounce((number: number, reaction: string) => {
    const { defaultPhonemes } = question
    switch (reaction) {
      case '':
        resolvePhonemes(defaultPhonemes, 'NOT_WRITTEN')
        break
      case '+':
        resolvePhonemes(defaultPhonemes.map(value => ({ ...value, react: value.target })), 'NOT_WRITTEN')
        break
      case '-':
        resolvePhonemes(defaultPhonemes.map(value => ({ ...value, react: [' ', '\n'].includes(value.target) ? value.target : '-' })), 'NOT_WRITTEN')
        break
      default:
        getPhonemes(questionId, { reaction, number })
          .then(data => { resolvePhonemes(data, 'COMPLETE') })
          .catch(() => { resolvePhonemes(defaultPhonemes, 'ERROR') })
    }
  }
  , 300)

  useEffect(() => {
    if (!isTyping) return
    handleGetPhonemes(question.number, answer.reaction)
  }, [answer.reaction, isTyping])

  return { handleChange }
}

export default useSubTestRow
