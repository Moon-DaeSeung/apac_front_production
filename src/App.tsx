import React from 'react'
import { Outlet } from 'react-router'
import { Global, css } from '@emotion/react'
import AppBar from './components/AppBar'

const globalStyle = css`
  * {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #f4f5f7;
  }
  #root {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 12px;
  }
`
function App () {
  return (
    <>
     <AppBar customCss={constraint}/>
     <Global styles={globalStyle} />
     <main css={[main]}>
       <div css={[constraint, content]}>
        <Outlet/>
       </div>
     </main>
    </>
  )
}

const constraint = css`
  padding: 0px 10px;
  width: 100%;
  border: 1px solid black;
  @media (min-width: 1280px) {
    width: 1280px;
  }
`
const main = css`
  display: flex;
  justify-content: center;
  background-color: grey;
  flex-grow: 1;
`
const content = css`
  background-color: greenyellow;
`

export default App
