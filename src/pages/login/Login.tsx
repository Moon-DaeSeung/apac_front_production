import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { login } from '../../auth/firebase'
import Button from '../../components/Button'
import TextField from '../../components/TextField'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleLogin = (e: any) => {
    e.preventDefault()
    login(email, password).catch(error => {
      let message = ''
      const code = error.code
      switch (code) {
        case 'auth/user-not-found':
          message = '존재하지 않는 아이디 입니다'
          break
        case 'auth/wrong-password':
          message = '비밀번호가 틀렸습니다'
          break
        case 'auth/invalid-email':
          message = 'email 형식이 아닙니다'
          break
        default:
          message = error.message
          break
      }
      setErrorMessage(message)
    }
    )
  }

  useEffect(() => {
    if (!email || !password) setErrorMessage('')
  }, [email, password])

  return (
    <form css={container}>
      <h1 css={title}>apac</h1>
      <TextField
        customCss={input}
        label="email"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <TextField
        customCss={input}
        label="passward"
        type="password"
        value={password}
        onChange={setPassword}
        isError={!!errorMessage}
        errorMessage={errorMessage}
      />
      <Button customCss={button} onClick={handleLogin}>
        로그인
      </Button>
    </form>
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
  padding: 50px 0px;
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
