/* eslint-disable no-unused-vars */
import { RequestInfoDto } from '../api/activeDirectory'

export enum Types {
    SET_USER_AUTHENTICATED = 'SET_USER_AUTHENTICATED',
    SET_REQUEST_INFO = 'SET_REQUEST_INFO',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR',
    RESET_USER_AUTHENTICATED = 'RESET_USER_AUTHENTICATED'
}

function create<T extends Types, D> (type: T, data: D = {} as any) {
  return { type, ...data } as const
}

export const setUserAuthenticated = () => create(Types.SET_USER_AUTHENTICATED)
export const setRequestInfo = (requestInfo: RequestInfoDto) => create(Types.SET_REQUEST_INFO, { requestInfo })
export const setError = (error: string) => create(Types.SET_ERROR, { error })
export const resetError = () => create(Types.RESET_ERROR)
export const resetUserAuthenticated = () => create(Types.RESET_USER_AUTHENTICATED)

export type ActionType =
| ReturnType<typeof setRequestInfo>
| ReturnType<typeof setError>
| ReturnType<typeof resetError>
| ReturnType<typeof setUserAuthenticated>
| ReturnType<typeof resetUserAuthenticated>
