import { ActionType, Types } from './actions'
import { ApplicationState } from './types'

export function storeReducer (
    state = {},
    action: ActionType
) : ApplicationState {
    switch (action.type) {
        case Types.SET_REQUEST_INFO: {
            return { ...state, requestInfo: action.requestInfo }
        }
        case Types.SET_ERROR: {
            return { ...state, error: action.error }
        }
        case Types.RESET_ERROR: {
            return { ...state, error: undefined }
        }
        default:
            return state
    }
}

export default storeReducer
