// eslint-disable-next-line no-use-before-define
import React, { useContext, } from 'react'
import { observer, } from 'mobx-react-lite'
import AuthStore from '../store/AuthStore'
import SignIn from '../view/components/SignIn'
import Home from './Home'

const App = observer(() => {
  const { isAuthenticated, } = useContext(AuthStore)

  console.log(isAuthenticated)
  return (
    <div className="app">
      {!isAuthenticated && <SignIn/>}
      {isAuthenticated && <Home/>}
    </div>
  )
})

export default App
