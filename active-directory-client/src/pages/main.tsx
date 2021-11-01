// eslint-disable-next-line no-use-before-define
import React from 'react'
import UserTable from '../view/components/userTable'
import SignIn from '../view/components/signIn'
import { ApplicationState, TypeOfConnect, connect, } from '../store'

const storeEnhancer = connect(
  (state: ApplicationState) => ({
    isUserAuthenticated: state.isUserAuthenticated,
  }),
  {}
)

type AppProps = {} & TypeOfConnect<typeof storeEnhancer>;

function App (props: AppProps) {
  return (
    <div className="app">
      {!props.isUserAuthenticated && <SignIn />}
      {props.isUserAuthenticated && <UserTable />}
    </div>
  )
}

export default storeEnhancer(App)
