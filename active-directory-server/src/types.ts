export type UserDto = {
    dn: string,
    sAMAccountName: string,
    whenCreated: string,
    pwdLastSet: string,
    userAccountControl: string,
    cn: string,
    description: string,
}

export type UsersDto = {
    users: UserDto[],
    totalCount: number
}

export type AdQuery = {

};