import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Home from './pages/home'
import Apac, { Information, Word, NormalSentence, SimpleSentence } from './pages/apac'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Home />}/>
            <Route path='tests/*' element={<Apac/>}>
              <Route index element={<Information/>} />
              <Route path='word' element={<Word/>} />
              <Route path='normal-sentence' element={<NormalSentence/>} />
              <Route path='simple-sentence' element={<SimpleSentence/>} />
            </Route>
            <Route path='*' element={<div>not found</div>}/>
          </Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
