import { useEffect } from 'react'
import { Answer, Phoneme } from '../../../libs/api/apac/types'
import { SubTestRow } from '../types'
import { createGetPhonemes } from '../useApac'

export type SubTestRowProps = {
  value: SubTestRow
  onChange: (value: SubTestRow) => void
  questionId: string
}

const useSubTestRow = ({ value, onChange, questionId }: SubTestRowProps) => {
  const { question, answer, isTyping } = value
  const handleChange = (key: keyof Answer) => (item: string | Phoneme[]) => {
    onChange({ ...value, answer: { ...value.answer, [key]: item } })
  }

  const handleGetPhonemes = createGetPhonemes({
    questionId,
    defaultPhonemes: question.defaultPhonemes,
    onChange: (phonemes, state, errorMessage = '') =>
      onChange({ ...value, isTyping: false, answer: { ...value.answer, phonemes, state, errorMessage } })
  })

  const handleChangeReaction = (reaction: string) => {
    onChange({ ...value, isTyping: true, answer: { ...value.answer, reaction } })
  }

  useEffect(() => {
    if (!isTyping) return
    handleGetPhonemes(question.number, answer.reaction)
  }, [answer.reaction])

  return { handleChange, handleChangeReaction }
}

export default useSubTestRow
