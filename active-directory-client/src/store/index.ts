import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as logger from 'redux-logger'
import { connect as reduxConnect, InferableComponentEnhancerWithProps } from 'react-redux'
import storeReducer from './reducer'
import { ApplicationState } from './types'

export const connect = <S, A>(state: (s : ApplicationState) => S, actions? : A) => {
    return reduxConnect(state, actions)
}

export type { ApplicationState } from './types'

// eslint-disable-next-line no-unused-vars
export type TypeOfConnect<T> = T extends InferableComponentEnhancerWithProps<infer Props, infer _>
    ? Props
    : never

export default function configureStore () {
    const loggerMiddleware = logger.createLogger()
    return createStore(
        storeReducer,
        undefined,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
}
