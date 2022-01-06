import { css } from '@emotion/react'
import React from 'react'
import { NavLink, Outlet, useParams, useLocation } from 'react-router-dom'
import { configs } from './config'
import { apacDefaultValue } from './defaultValue'
import { ApacUiState, SubTestRow } from './types'
import { SaveType, TestType, useApac } from './useApac'

export type ApacContextProps = {
  value: ApacUiState
  setValue: (func: (value: ApacUiState) => ApacUiState) => void
  handleSave: (type: SaveType) => void
  handleWordTestChange: ((value: SubTestRow) => void)[]
  handleSimpleSentenceTestChange: ((value: SubTestRow) => void)[]
  handleNormalSentenceTestChange: ((value: SubTestRow) => void)[]
  handleAllAnswerCheck: (testType: TestType) => () => void
}

const Apac = () => {
  const { id } = useParams<{id: string}>()
  const {
    apacUiState, setApacUiState, handleSave,
    handleWordTestChange, handleNormalSentenceTestChange, handleSimpleSentenceTestChange,
    handleAllAnswerCheck
  } = useApac({ defaultValue: apacDefaultValue, id: Number(id) })
  const { pathname } = useLocation()
  let current = pathname.split('/').pop()!!
  current = current === id ? '' : current
  return (
    <>
      <header css={[header, container, constaint, id || disable]}>
        <nav>
          <menu css={memu}>
            {configs.map(({ to, name }) => {
              return (
                <NavLink key={name} to={to} css={[menuItem, to === current && active]}>
                  <li>{name}</li>
                </NavLink>
              )
            })}
          </menu>
        </nav>
      </header>
      <main css={[main, container, constaint]}>
        <Outlet context={{
          handleSave,
          value: apacUiState,
          setValue: setApacUiState,
          handleSimpleSentenceTestChange,
          handleNormalSentenceTestChange,
          handleWordTestChange,
          handleAllAnswerCheck
        }} />
      </main>
    </>
  )
}

export default Apac

const header = css`
  margin: 20px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const memu = css`
  display: flex;
  padding: 10px;
  margin: 0px;
`
const menuItem = css`
  padding: 30px 5px;
  margin: 0;
  flex: 1 1 0;
  text-align: center;
  text-decoration: none;
  :not(:first-of-type) {
    border-left: solid #dadada 2px;
  }
  :hover {
    background-color: #B5E0F1;
  }
  li {
    list-style: none;
  }
`
const active = css`
  background-color: #d8ecf3;
`
const main = css`
  padding: 10px 20px;
  border-radius: 4px;
`
const container = css`
  background-color: white;
  border-radius: 4px;
`
const constaint = css`
  min-width: 780px;
`
const disable = css`
  pointer-events: none;
  background-color: whitesmoke;
`
