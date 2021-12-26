export type Phoneme = {
  목표음소: string
  반응음소: string
  왜곡음소: string
  오류패턴List: ErrorPattern[]
}

export type ErrorPattern = {
  id: number
  name: string
}

export type Answer = {
  number: number
  phonemes: Phoneme[]
}
