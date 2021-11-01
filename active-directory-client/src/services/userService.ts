import { UserInfoDto, } from '../api/api'

export interface UserInfo {
  dn: string;
  sAMAccountName: string;
  whenCreated: string;
  pwdLastSet: string;
  userAccountControl: string;
  cn: string;
  description: string;
}

export function CreateUserInfoFromDto (users: UserInfoDto[]): {
  [id: string]: UserInfo;
} {
  const usersInfo: { [id: string]: UserInfo } = {}
  users.forEach((user) => {
    usersInfo[user.cn] = user
  })

  return usersInfo
}
