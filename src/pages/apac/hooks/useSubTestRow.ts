import { useEffect, useRef, useState } from 'react'
import useDebounce from '../../../hooks/useDebouce'
import { calcaulateTotalErrorPatterns, getPhonemes } from '../../../libs/api/apac'
import { Answer, AnswerState, Phoneme, TotalErrorPattern } from '../../../libs/api/apac/types'
import { ServerError } from '../../../libs/api/Api'
import { SubTestRow } from '../types'

export type SubTestRowProps = {
  value: SubTestRow
  onChange: (func: (prev: SubTestRow) => SubTestRow) => void
  questionId: string
  setIsTriggered: (value: boolean) => void
  isTriggered: boolean
}

const useSubTestRow = ({ value, onChange, questionId, isTriggered, setIsTriggered }: SubTestRowProps) => {
  const [isPendingTotalErrorPattern, setIsPendingTotalErrorPattern] = useState(false)
  const { question, answer, isTyping } = value
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const reactionRef = useRef<HTMLInputElement>(null)

  const handleChange = (key: keyof Answer) => (item: string | Phoneme[] | TotalErrorPattern[]) => {
    key === 'phonemes' && setIsPendingTotalErrorPattern(true)
    onChange(prev => {
      return { ...prev, isTyping: key === 'reaction' ? true : prev.isTyping, answer: { ...prev.answer, [key]: item } }
    })
  }

  const resolvePhonemes = (phonemes: Phoneme[], state: AnswerState = 'COMPLETE', errorMessage = '') => {
    onChange(prev => {
      return { ...prev, isTyping: false, answer: { ...prev.answer, phonemes, state, errorMessage, totalErrorPatterns: [] } }
    })
  }

  const handleGetPhonemes = useDebounce((number: number, reaction: string) => {
    const { defaultPhonemes } = question
    switch (reaction) {
      case '':
        resolvePhonemes(defaultPhonemes, 'NOT_WRITTEN')
        break
      case '+':
        resolvePhonemes(defaultPhonemes.map(value => ({ ...value, react: value.target })), 'COMPLETE')
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

  useEffect(
    () => {
      if (!containerEl || !onChange) return
      const handleActiveChange = (isActive: boolean) => {
        onChange(prev => {
          if (prev.isActive === isActive) return prev
          return { ...prev, isActive }
        })
      }
      const listener = (event: any) => {
        const isActive = containerEl.contains(event.target)
        handleActiveChange(isActive)
      }
      document.addEventListener('click', listener)
      document.addEventListener('focusin', listener)
      return () => {
        document.removeEventListener('click', listener)
        document.removeEventListener('focusin', listener)
      }
    }, [onChange, containerEl]
  )

  const reactionEl = reactionRef.current
  useEffect(() => {
    if (!reactionEl || !(isTriggered && value.isActive)) return
    reactionEl.focus()
    setIsTriggered(false)
  }, [reactionEl, isTriggered, value.isActive])

  return { handleChange, setContainerEl, reactionRef }
}

export default useSubTestRow
