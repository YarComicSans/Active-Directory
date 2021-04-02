// eslint-disable-next-line no-use-before-define
import React from 'react'
import UserTable from '../view/components/userTable'
import { ApplicationState, TypeOfConnect, connect } from '../store'

const storeEnhancer = connect(
    (state: ApplicationState) => ({}), {}
)

type AppProps = {} & TypeOfConnect<typeof storeEnhancer>

function App (props: AppProps) {
    return (
        <div className='app'>
            <UserTable/>
        </div>
    )
}

export default storeEnhancer(App)
