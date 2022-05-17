import { useRecoilState } from 'recoil'
import { errorPatternOptions as errorPatternOptionsState } from '../atoms/errorPatternOptions'

export default function useErrorPatternOptions () {
  const [errorPatternOptions, setErrorPatternOptions] = useRecoilState(errorPatternOptionsState)
  return {
    errorPatternOptions,
    setErrorPatternOptions
  }
}
