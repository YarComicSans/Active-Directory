import { User, Users, } from '../types/types.users'

export type GetUserResponse = {
    users: Users
}

export type UpdateUsersPayload = {
    users: Users
}

export type DeleteUserPayload = {
    user: User,
}

export type AddUserPayload = {
    user: User,
}

export type AddUserResponse = {
    user: User,
}