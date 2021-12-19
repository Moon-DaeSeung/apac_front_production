import { css } from '@emotion/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import DateInput from '../../components/DateInput'
import Pagination from '../../components/Pagination'

const Home = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [date, setDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <>
      <header css={[container, header]}>
        <div css={title}>
          <h2>검사 목록</h2>
        </div>
        <form css={[search]}>
          <fieldset css={[fieldset]}>
            <label>이름</label>
            <TextField customCss={nameInput} />
          </fieldset>
          <fieldset css={[fieldset]}>
            <label>검사일자</label>
            <DateInput customCss={dateInput} value={date} onChange={setDate} />
          </fieldset>
          <Button
            onClick={(e: any) => {
              e.preventDefault()
            }}
          >
            조회
          </Button>
        </form>
      </header>
      <main css={container}>
        <Link to="tests" css={register}>
          <Button
            customCss={css`
              padding: 10px 60px;
            `}
          >
            등록
          </Button>
        </Link>
        <div css={[row]}>
          <div css={[item]}>이름</div>
          <div css={[item]}>성별</div>
          <div css={[item]}>나이</div>
          <div css={[item]}>검사일자</div>
          <div css={[item]}>특이사항</div>
          <div css={[item]}>수정하기</div>
        </div>
        {data.map((value) => {
          return (
            <div key={value} css={row}>
              <div css={item}>{value}</div>
              <div css={item}>{value}</div>
              <div css={item}>{value}</div>
              <div css={item}>{value}</div>
              <div css={item}>{value}</div>
              <div css={item}>
                <Button customCss={modify}>수정</Button>
              </div>
            </div>
          )
        })}
        <footer css={[page]}>
          <Pagination
            totalPageCount={10}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </footer>
      </main>
    </>
  )
}

export default Home

const nameInput = css`
  width: 100px;
  height: 50px;
`
const dateInput = css`
  width: 200px;
  height: 50px;
`
const container = css`
  margin-top: 20px;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
`
const header = css`
 box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const title = css`
  margin: 10px 0px;
  display: flex;
`
const register = css`
  margin-left: auto;
  margin-right: 20px;
  align-self: flex-end;
  margin: 10px;
  padding: 10px;
  width: 200px;
  a {
    text-decoration: none;
  }  
`
const search = css`
  display: flex;
  margin: 0;
  padding: 0;
  gap: 15px;
`
const fieldset = css`
  border: none;
  padding: 0px;
  display: flex;
  align-items: center;
  gap: 10px;
`
const row = css`
  display: grid;
  grid-template-columns: 3fr 1fr 4fr 6fr 8fr 2fr;
  div {
    &:nth-child(1) {
      border-left-width: 2px;
    }
  }
  //검사 목록 하단
  &:last-of-type {
    div {
      :first-child {
        border-bottom-left-radius: 10px;
      }
      :last-child {
        border-bottom-right-radius: 10px;
      }
    }
  }
  //검사 목록의 header 부분
  &:first-of-type {
    div {
      background-color: #F5F9FB;
      border-top-width: 2px;
      font-weight: bold;
      color: #979DAF;
      
      :first-child {
        border-top-left-radius: 10px;
      }
      :last-child {
        border-top-right-radius: 10px;
      }
    }
  }
`
const item = css`
  border-style: solid;
  border-color: #EAEFF2;
  border-width: 0px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  display: flex;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  color: #CBD1D8;
`
const page = css`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`
const modify = css`
  padding: 10px 20px;
  font-size: 1rem;
`
