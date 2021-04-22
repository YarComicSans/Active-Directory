import { UserInfoDto } from '../api/activeDirectory'

export interface UserInfo {
    dn: string,
    sAMAccountName: string,
    whenCreated: string,
    pwdLastSet: string,
    userAccountControl: string,
    cn: string,
    description: string,
}

export function CreateUserInfoFromDto (user: UserInfoDto) : UserInfo {
  return { ...user }
}
