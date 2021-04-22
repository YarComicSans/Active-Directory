import { Injectable } from '@nestjs/common'
import * as Activedirectory from 'activedirectory'
import { Config } from './config'
import { ActiveDirectoryConfig, UserAuthenticationResult, UserDto } from './types'

@Injectable()
export class ActiveDirectory {
    public activeDirectory: any

    constructor (private readonly config: Config) {
        const activeDirectoryConfig = this.config.provideConfig()
        this.activeDirectory = new Activedirectory(activeDirectoryConfig)
    }

    ResetConfig (newActiveDirectoryConfig: ActiveDirectoryConfig) {
        this.config.resetConfig(newActiveDirectoryConfig)

        if (this.config.isValid) { this.activeDirectory = new Activedirectory(this.config.provideConfig()) }
    }

    async GetUsers () : Promise<UserDto[]> {
        return new Promise((resolve, reject) => {
            this.activeDirectory.findUsers('cn=*', true, function (err, users) {
                if (err) {
                    console.log('ERROR: ' + JSON.stringify(err))
                    return []
                }
                console.log(users)

                resolve(users)
            })
        })
        // return new Promise((resolve) => {
        //     resolve([{
        //         dn:"CN=Guest,CN=Users,DC=mydomain,DC=ru",
        //         sAMAccountName:"Guest",
        //         whenCreated:"20210207140220.0Z",
        //         pwdLastSet:"0",
        //         userAccountControl:"66082",
        //         cn:"Guest",
        //         description:"Built-in account for guest access to the computer/domain"
        //     }])
        // })
    }

    async AuthenticateUser (username: string, password: string): Promise<UserAuthenticationResult> {
        return new Promise((resolve, reject) => {
            this.activeDirectory.authenticate(username, password, function (err, auth) {
                if (err) {
                    console.log('ERROR: ' + JSON.stringify(err))
                    resolve({
                        status: 'Error',
                        error: JSON.stringify(err)
                    })
                }
                if (auth) {
                    resolve({
                        status: 'Ok',
                        error: null
                    })
                } else {
                    resolve({
                        status: 'Failed',
                        error: null
                    })
                }
            })
        })
    }
}

//   const config = {
//     url: process.env.URL,
//     baseDN: process.env.BASEDN,
//     username: process.env.USER,
//     password: process.env.PASSWORD
//   }
//   this.activeDirectory = new activedirectory(config)
