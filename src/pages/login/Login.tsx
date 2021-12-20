import { css } from '@emotion/react'
import React, { useState } from 'react'
import { login } from '../../auth/firebase'
import Button from '../../components/Button'
import TextField from '../../components/TextField'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div css={container}>
      <h1 css={title}>apac</h1>
      <TextField customCss={input} label='email' type='email' value={email} onChange={setEmail}/>
      <TextField customCss={input} label='passward' type='password' value={password} onChange={setPassword}/>
      <Button customCss={button} onClick={() => login(email, password)}>로그인</Button>
    </div>
  )
}

export default Login

const title = css`
 margin-top: 10px;
 margin-bottom: 20px;
 font-size: 3rem;
 color: blue;
`
const container = css`
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
const input = css`
  width: 300px;
`
const button = css`
  width: 200px;
  margin-top: 20px;
`
