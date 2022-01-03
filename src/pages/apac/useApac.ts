import { useState } from 'react'
import { ApacState } from './types'
type UseApacProps = {
  defaultValue: ApacState
}

export const useApac = ({ defaultValue }: UseApacProps) => {
  const [apacState, setApacState] = useState<ApacState>(defaultValue)
  return { apacState, setApacState }
}
