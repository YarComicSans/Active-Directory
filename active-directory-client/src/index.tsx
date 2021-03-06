// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDOM from 'react-dom'
import Content from './pages/main'
import * as serviceWorker from './serviceWorker'
import { Provider, } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Content/>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
