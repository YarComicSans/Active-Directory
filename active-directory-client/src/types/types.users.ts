export type User = {
    dn: string,
    sAMAccountName?: string,
    whenCreated?: string,
    pwdLastSet?: string,
    userAccountControl?: string,
    cn?: string,
    description?: string,
  }

export type Users = {[id: string]: User}
