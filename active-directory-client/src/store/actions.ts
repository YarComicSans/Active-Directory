/* eslint-disable no-unused-vars */
import { RequestInfoDto } from '../api/activeDirectory'

export enum Types {
    SET_REQUEST_INFO = 'SET_REQUEST_INFO',
    SET_ERROR = 'SET_ERROR',
    RESET_ERROR = 'RESET_ERROR'
}

function create<T extends Types, D> (type: T, data: D = {} as any) {
    return { type, ...data } as const
}

export const setRequestInfo = (requestInfo: RequestInfoDto) => create(Types.SET_REQUEST_INFO, { requestInfo })
export const setError = (error: string) => create(Types.SET_ERROR, { error })
export const resetError = () => create(Types.RESET_ERROR)

export type ActionType =
| ReturnType<typeof setRequestInfo>
| ReturnType<typeof setError>
| ReturnType<typeof resetError>
