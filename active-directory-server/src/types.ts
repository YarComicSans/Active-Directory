export type UserDto = {
  dn: string;
  sAMAccountName: string;
  whenCreated: string;
  pwdLastSet: string;
  userAccountControl: string;
  cn: string;
  description: string;
};

export type UsersDto = {
  users: UserDto[];
  totalCount: number;
};

export type CredentialsPayload = {
  username: string;
  domain: string;
  password: string;
  ldapUrl: string;
};

type AuthStatus = 'Error' | 'Ok' | 'Failed'

export type UserAuthenticationResult = {
  status: AuthStatus,
  error?: string
}

export type ActiveDirectoryConfig = {
  url: string,
  baseDN: string,
  username: string,
  password: string
}

export type ActiveDirectoryConfigDto = {
  ldapUrl: string,
  basedn: string,
  username: string,
  password: string
}

export type AdQuery = {};
