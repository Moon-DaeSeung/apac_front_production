import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Apac, { Information, Word } from './pages/apac'
import NormalSentence from './pages/apac/normal-sentence'
import SimpleSentence from './pages/apac/simple-sentence'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Home/>} />
          <Route path='tests' element={<Apac/>}>
            <Route path='information' element={<Information/>}/>
            <Route path='word' element={<Word/>}/>
            <Route path='normal-sentence' element={<NormalSentence/>}/>
            <Route path='simple-sentence' element={<SimpleSentence/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
