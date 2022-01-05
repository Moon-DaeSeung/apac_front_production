import { useEffect, useState } from 'react'
import { getAllApac } from '../../libs/api/apac'
import { TestInformation } from '../../libs/api/apac/types'

const useHome = () => {
  const [tests, setTests] = useState<TestInformation[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(5)
  const getSearchedData = ({ testeeName, testedDate, page }: { testeeName?: string, testedDate?: string, page: number }) => {
    getAllApac({ page, testeeName, testedDate }).then(callback)
  }
  useEffect(() => {
    getAllApac({ page: currentPage }).then(callback)
  }, [currentPage])

  const callback = ({ content, totalPage: total }: {content: TestInformation[], totalPage: number}) => {
    setTests(content)
    setTotalPage(total)
  }

  return { setCurrentPage, currentPage, totalPage, tests, getSearchedData }
}

export default useHome
