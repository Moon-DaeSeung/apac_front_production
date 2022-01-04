import { api } from '../Api'
import { Pagination, TestInformation } from './types'

export default async function getAllApac (params: GetAllApacRequestQuery) {
  return await api.get('/tests', { params })
}

export type GetAllApacResponse = {
  content: TestInformation[],
  currentPage: number,
  totalPage: number
}

export type GetAllApacRequestQuery = {
  testeeName?: string,
  testedDate?: string
} & Pagination
