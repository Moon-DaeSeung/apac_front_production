import React from 'react'
import { Outlet } from 'react-router'
import { Global, css } from '@emotion/react'
import { Link } from 'react-router-dom'

const globalStyle = css`
  * {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';;
  }
  body {
    height: 100%;
    margin: 0;
    min-width: 1600px;
    background-color: #f4f5f7;
  }
  #root {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
`
function App () {
  return (
    <>
     <Global styles={globalStyle} />
     <header css={css`width: 100px;`}>
       <Link to='/'>
         <h1>HOME</h1>
       </Link>
     </header>
     <Outlet/>
    </>
  )
}

export default App
