import { api } from '../Api'
import { ApacTest, SubTest } from './types'

export default async function patchApac (id: number, payload: PatchApacRequest) {
  return await api.patch<PatchApacResponse>(`/tests/${id}`, payload)
}

export type PatchApacRequest = {
  testeeName?: string
  testeeGender?: string
  testeeAge?: string
  testeeNote?: string
  testedDate?: string | null
  wordTest?: SubTest
  simpleSentenceTest?: SubTest
  normalSentenceTest?: SubTest
}
export type PatchApacResponse = ApacTest
