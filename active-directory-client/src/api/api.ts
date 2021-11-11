import axios from 'axios'
import { API_REQUEST_TIMEOUT, API_SERVER, } from './api.constants'
import { CredentialsPayload, LoginResponse, } from './api.login.types'
import { AgentInstance, } from './api.types'
import { AddUserPayload, AddUserResponse, DeleteUserPayload, GetUserResponse, UpdateUsersPayload, } from './api.user.types'

export type RequestStatus = 'success' | 'failed' | 'running';

export type RequestInfoDto = {
  status: RequestStatus;
};

export type LoginPayload = {
  username: string,
  password: string,
  ldapUrl: string,
}

class Api {
  private readonly axios: AgentInstance

  constructor () {
    this.axios = axios.create({
      baseURL: API_SERVER,
      timeout: API_REQUEST_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  public login = (payload: LoginPayload) =>
    this.axios.post(`${API_SERVER}active-directory/auth`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })

  public getUsers = () =>
    this.axios.get<GetUserResponse>('active-directory/users?dn=Users')

  public addUser = (payload: AddUserPayload) => this.axios.post<AddUserResponse>('active-directory/user', payload)

  public updateUsers = (payload: UpdateUsersPayload) =>
    this.axios.put('active-directory/users', payload)

  public deleteUser = (payload: DeleteUserPayload) =>
    this.axios.delete('active-directory/users', { data: payload.user, })
}

const api = new Api()

export default api

// export const signInUser = (signInParams: UserSignInParams) =>
//   post<UserSignInParams>('active-directory/auth', signInParams)

// export const getUsers = (
// ): Promise<Users> => {
//   //   return get<UserInfosDto>('active-directory/users')
//   return new Promise((resolve) => {
//     const response = [
//       {
//         dn: 'CN=Guest,CN=Users,DC=mydomain,DC=ru',
//         sAMAccountName: 'Guest',
//         whenCreated: '20210207140220.0Z',
//         pwdLastSet: '0',
//         userAccountControl: '66082',
//         cn: 'Guest',
//         description:
//           'Built-in account for guest access to the computer/domain',
//       },
//       {
//         dn: 'CN=Administrator,CN=Users,DC=mydomain,DC=ru',
//         sAMAccountName: 'Administrator',
//         whenCreated: '20210207140220.0Z',
//         pwdLastSet: '132571801407584760',
//         userAccountControl: '512',
//         cn: 'Administrator',
//         description: 'Built-in account for administering the computer/domain',
//       },
//       {
//         dn: 'CN=krbtgt,CN=Users,DC=mydomain,DC=ru',
//         sAMAccountName: 'krbtgt',
//         whenCreated: '20210207140220.0Z',
//         pwdLastSet: '132571801407942610',
//         userAccountControl: '514',
//         cn: 'krbtgt',
//         description: 'Key Distribution Center Service Account',
//       }
//     ]
//     const users: Users = {}
//     // eslint-disable-next-line no-return-assign
//     response.forEach(user => users[user.dn] = user)
//     return resolve(users)
//   })
// }

// export const setUsers = (users: Users) => {
//   // put(users)
// }

// export const deleteUser = (user: User) => {
//   // delete(user)
// }
