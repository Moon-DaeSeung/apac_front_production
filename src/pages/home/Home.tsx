import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

const Home = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <>
      <header css={container}>
        <div css={title}>
          <h2>검사 목록</h2>
        </div>
        <form css={[search]}>
          <fieldset css={[fieldset]}>
            <label>이름</label>
            <input />
          </fieldset>
          <fieldset css={[fieldset]}>
            <label>검사일자</label>
            <input />
          </fieldset>
          <button>조회</button>
        </form>
      </header>
      <main css={container}>
        <Link to="tests" css={register}>
          <button css={css`width: 100%; padding: 10px;`}>등록</button>
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
        <footer css={[carrecel]}>캐러셀</footer>
      </main>
    </>
  )
}

export default Home

const container = css`
  margin-top: 20px;
  border: solid 1px blue;
  padding: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
`
const title = css`
  border: solid 1px;
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
  border: solid 1px;
  display: flex;
  gap: 10px;
  margin: 0;
`
const fieldset = css`
  display: flex;
  align-items: center;
  gap: 8px;
`
const row = css`
  display: grid;
  grid-template-columns: 3fr 1fr 4fr 6fr 8fr 2fr;
  div {
    &:nth-child(1) {
      border-left: solid 1px;
    }
  }
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
  &:first-of-type {
    div {
      background-color: lightblue;
      border-top: solid 1px;
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
  border-right: solid 1px;
  border-bottom: solid 1px;
  display: flex;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
`
const carrecel = css`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`
const modify = css`
  padding: 10px 20px;
  font-size: 1rem;
`
