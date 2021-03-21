export type RequestStatus = 'success' | 'failed' | 'running'

export type RequestInfoDto = {
    status: RequestStatus,
}

export type UserInfoDto = {
    dn: string,
    sAMAccountName: string,
    whenCreated: string,
    pwdLastSet: string,
    userAccountControl: string,
    cn: string,
    description: string,
}

export type UserInfosDto = {
    users: UserInfoDto[],
    totalCount: number
}

export type UserFetchParams = {
    pageSize: number,
    pageNumber: number
}

// export const getUsers = (userParams: UserFetchParams) : UserInfosDto => {
//     // return get<UserInfosDto>('/users')
//     return {
//         users: [
//             {
//                 dn: 'CN=Guest,CN=Users,DC=mydomain,DC=ru',
//                 sAMAccountName: 'Guest',
//                 whenCreated: '20210207140220.0Z',
//                 pwdLastSet: '0',
//                 userAccountControl: '66082',
//                 cn: 'Guest',
//                 description: 'Built-in account for guest access to the computer/domain'
//             },
//             {
//                 dn: 'CN=Administrator,CN=Users,DC=mydomain,DC=ru',
//                 sAMAccountName: 'Administrator',
//                 whenCreated: '20210207140220.0Z',
//                 pwdLastSet: '132571801407584760',
//                 userAccountControl: '512',
//                 cn: 'Administrator',
//                 description: 'Built-in account for administering the computer/domain'
//             },
//             {
//                 dn: 'CN=krbtgt,CN=Users,DC=mydomain,DC=ru',
//                 sAMAccountName: 'krbtgt',
//                 whenCreated: '20210207140220.0Z',
//                 pwdLastSet: '132571801407942610',
//                 userAccountControl: '514',
//                 cn: 'krbtgt',
//                 description: 'Key Distribution Center Service Account'
//             }
//          ],
//         totalCount: 3
//     }
// }

export const getUsers = (userParams: UserFetchParams) : Promise<UserInfosDto> => {
    // return get<UserInfosDto>('/users')
    return new Promise((resolve) => {
        return resolve({
            users: [
                {
                    dn: 'CN=Guest,CN=Users,DC=mydomain,DC=ru',
                    sAMAccountName: 'Guest',
                    whenCreated: '20210207140220.0Z',
                    pwdLastSet: '0',
                    userAccountControl: '66082',
                    cn: 'Guest',
                    description: 'Built-in account for guest access to the computer/domain'
                },
                {
                    dn: 'CN=Administrator,CN=Users,DC=mydomain,DC=ru',
                    sAMAccountName: 'Administrator',
                    whenCreated: '20210207140220.0Z',
                    pwdLastSet: '132571801407584760',
                    userAccountControl: '512',
                    cn: 'Administrator',
                    description: 'Built-in account for administering the computer/domain'
                },
                {
                    dn: 'CN=krbtgt,CN=Users,DC=mydomain,DC=ru',
                    sAMAccountName: 'krbtgt',
                    whenCreated: '20210207140220.0Z',
                    pwdLastSet: '132571801407942610',
                    userAccountControl: '514',
                    cn: 'krbtgt',
                    description: 'Key Distribution Center Service Account'
                }
            ],
            totalCount: 3
        })
    })
}