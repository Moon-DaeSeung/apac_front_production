import { css } from '@emotion/react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { configs } from './config'

const Apac = () => {
  return (
    <>
      <header css={[header]}>
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
      <main css={[main]}>
        <Outlet />
      </main>
    </>
  )
}

export default Apac

const header = css`
 border: solid 1px black;
 margin: 20px 0;
 background-color: white;
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
  border-left: solid black 2px;
 } 
 :hover {
   background-color: lightblue
 }
 li {
   list-style: none;
 }
`
const main = css`
 background-color: white;
 padding: 10px;
`
