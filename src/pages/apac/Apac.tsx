import { css } from '@emotion/react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { configs } from './config'

const Apac = () => {
  return (
    <>
      <header css={[header, container, constaint]}>
        <nav>
          <menu css={memu}>
            {configs.map(({ to, name }) => {
              return (
                <Link key={name} to={to} css={menuItem}>
                  <li>{name}</li>
                </Link>
              )
            })}
          </menu>
        </nav>
      </header>
      <main css={[main, container, constaint]}>
        <Outlet />
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
  :not(:first-child) {
    border-left: solid #dadada 2px;
  }
  :hover {
    background-color: lightblue;
  }
  li {
    list-style: none;
  }
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
