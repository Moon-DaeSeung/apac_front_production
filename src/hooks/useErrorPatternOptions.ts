import { useRecoilState } from 'recoil'
import { errorPatternOptions as errorPatternOptionsState } from '../atoms/errorpatternOptions'

export default function useErrorPatternOptions () {
  const [errorPatternOptions, setErrorPatternOptions] = useRecoilState(errorPatternOptionsState)
  return {
    errorPatternOptions,
    setErrorPatternOptions
  }
}
