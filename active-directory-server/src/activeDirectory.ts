import { Injectable } from '@nestjs/common'
import * as ldap from 'ldapjs'
import { Client, Change } from 'ldapjs'
import { Config } from './config'

export type AuthPayload = {
    dn: string;
    password: string;
}

type User = {
}

type Group = {
}

export type AddPayload = {
    dn: string;
    entry: User | Group;
}

export type DeletePayload = {
    dn: string;
}

enum ModifyOperations {
    Replace = 'replace',
    Add = 'add',
    Delete = 'delete'
}

export type ModifyPayload = {
    dn: string;
    operation: ModifyOperations;
    modification: any;
}

export type SearchPayload = {
    dn?: string;
    options?: {
        filter?: string;
        scope?: 'base' | 'one' | 'sub';
        attributes?: string;
    }
}

export type ConnectPayload = {
    url: string;
}

@Injectable()
export class ActiveDirectory {
    private client: Client

    constructor (private readonly config: Config) {
    }

    connect (payload: ConnectPayload): Promise<any> {
        return new Promise((resolve) => {
            this.client = ldap.createClient({
                url: payload.url
            })

            this.client.on('connect', () => {
                console.log(`Connected to ${payload.url} ldap!`)
                resolve(`Connected to ${payload.url} ldap!`)
            })
        })
    }

    authenticate (payload: AuthPayload): Promise<string> {
        const { dn, password } = payload

        return new Promise<string>((resolve, reject) =>
            this.client.bind(dn, password, (err) => {
                if (err) reject(err)
                else resolve('Successfully authenticated!')
            })
        )
    }

    add (payload: AddPayload): Promise<string> {
        const { dn, entry } = payload

        return new Promise<string>((resolve, reject) =>
            this.client.add(dn, entry, (err) => {
                if (err) reject(err)
                else resolve('Successfully added entry!')
            })
        )
    }

    delete (payload: DeletePayload): Promise<string> {
        const { dn } = payload

        return new Promise<string>((resolve, reject) =>
            this.client.del(dn, (err) => {
                if (err) reject(err)
                else resolve('Successfully deleted entry!')
            })
        )
    }

    modify (payload: ModifyPayload): Promise<string> {
        const { dn, operation, modification } = payload
        const change = new Change({
            operation,
            modification
        })

        return new Promise<string>((resolve, reject) =>
            this.client.modify(dn, change, (err) => {
                if (err) reject(err)
                else resolve('Successfully modified entry!')
            })
        )
    }

    search (payload: SearchPayload): Promise<any> {
        const { dn, options } = payload
        const opts = options
            ? {
                filter: options.filter ? options.filter : '',
                scope: options.scope ? options.scope : undefined,
                attributes: options.attributes ? options.attributes : ''
            }
            : {
            }

        return new Promise<any>((resolve, reject) =>
            this.client.search(dn, opts, (err, res) => {
                if (err) reject(err)

                const resultEntries = []

                res.on('searchEntry', (entry) => {
                    resultEntries.push(JSON.stringify(entry.object))
                })

                res.on('end', (result) => {
                    if (result.status) resolve(resultEntries)
                    else reject(result.status)
                })
            })
        )
    }

    logout (): Promise<string> {
        return new Promise<string>((resolve, reject) =>
            this.client.unbind(
                (err) => {
                    if (err) reject(err)
                    else resolve('Successful logout!')
                })
        )
    }
    //     public activeDirectory: any

    //     constructor (private readonly config: Config) {
    //         const activeDirectoryConfig = this.config.provideConfig()
    //         this.activeDirectory = new Activedirectory(activeDirectoryConfig)
    //     }

    //     ResetConfig (newActiveDirectoryConfig: ActiveDirectoryConfig) {
    //         this.config.resetConfig(newActiveDirectoryConfig)

    //         if (this.config.isValid) { this.activeDirectory = new Activedirectory(this.config.provideConfig()) }
    //     }

    //     async GetUsers () : Promise<UserDto[]> {
    //         return new Promise((resolve, reject) => {
    //             this.activeDirectory.findUsers('cn=*', true, function (err, users) {
    //                 if (err) {
    //                     console.log('ERROR: ' + JSON.stringify(err))
    //                     return []
    //                 }
    //                 console.log(users)

    //                 resolve(users)
    //             })
    //         })
    //         // return new Promise((resolve) => {
    //         //     resolve([{
    //         //         dn:"CN=Guest,CN=Users,DC=mydomain,DC=ru",
    //         //         sAMAccountName:"Guest",
    //         //         whenCreated:"20210207140220.0Z",
    //         //         pwdLastSet:"0",
    //         //         userAccountControl:"66082",
    //         //         cn:"Guest",
    //         //         description:"Built-in account for guest access to the computer/domain"
    //         //     }])
    //         // })
    //     }

//     async AuthenticateUser (username: string, password: string): Promise<UserAuthenticationResult> {
//         return new Promise((resolve, reject) => {
//             this.activeDirectory.authenticate(username, password, function (err, auth) {
//                 if (err) {
//                     console.log('ERROR: ' + JSON.stringify(err))
//                     resolve({
//                         status: 'Error',
//                         error: JSON.stringify(err)
//                     })
//                 }
//                 if (auth) {
//                     resolve({
//                         status: 'Ok',
//                         error: null
//                     })
//                 } else {
//                     resolve({
//                         status: 'Failed',
//                         error: null
//                     })
//                 }
//             })
//         })
//     }
// }
}

//   const config = {
//     url: process.env.URL,
//     baseDN: process.env.BASEDN,
//     username: process.env.USER,
//     password: process.env.PASSWORD
//   }
//   this.activeDirectory = new activedirectory(config)
