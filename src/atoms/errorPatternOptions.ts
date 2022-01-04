import { atom } from 'recoil'
import { ErrorPattern } from '../libs/api/apac/types'

export const errorPatternOptions = atom<ErrorPattern[]>({
  key: 'errorPatternOptionsState',
  default: [
    { id: 1, name: '연구개음' },
    { id: 2, name: '전형어중' },
    { id: 3, name: '음절반복' },
    { id: 4, name: '도치' },
    { id: 5, name: '기타' }
  ]
})
