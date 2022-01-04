import { css, SerializedStyles } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../auth/firebase'
import useUser from '../../hooks/useUser'
import { userStorage } from '../../libs/storage/user'
import Button from '../Button'

export type AppBarProps = {
  customCss?: SerializedStyles
}

const AppBar = ({ customCss }: AppBarProps) => {
  const { user } = useUser()
  const handleLogout = () => {
    logout()
    userStorage.set(null)
  }
  return (
     <header css={[header]}>
       <div css={[layout, customCss]}>
        <Link to='/' css={home}>
          <h1>APAC</h1>
        </Link>
        <div css={[logInOut]}>
            <div>{user?.name}</div>
            <Button customCss={button} onClick={handleLogout}>logout</Button>
        </div>
       </div>
     </header>
  )
}

export default AppBar

const button = css`
 font-size: 12px;
 padding: 8px 15px;
`
const home = css`
  text-decoration: none;
  color: black;
`
const header = css`
  display: flex;
  justify-content: center;
  background-color: white;
`
const layout = css`
  display: flex;
`
const logInOut = css`
  margin-left: auto;
  align-self: center;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`
