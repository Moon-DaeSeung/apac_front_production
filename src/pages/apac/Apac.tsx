import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Apac = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to='information'>information</Link></li>
          <li><Link to='word'>word</Link></li>
          <li><Link to='normal-sentence'>normal sentence</Link></li>
          <li><Link to='simple-sentence'>simple sentence</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Apac
