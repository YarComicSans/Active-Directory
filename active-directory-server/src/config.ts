import * as dotenv from 'dotenv'
import * as path from 'path'
import { ActiveDirectoryConfig } from './types'

export class Config {
    public username?: string
    public password?: string
    public url?: string
    public baseDN?: string
    public isValid: boolean

    constructor () {
        const parser = dotenv.config({ path: path.join(__dirname, '../config.env') })
        if (!parser.error) {
            const config: any = parser.parsed
            this.username = config.username
            this.password = config.password
            this.url = config.url
            this.baseDN = config.basedn
        }

        this.isValid = !!this.username && !!this.password && !!this.url && !!this.baseDN
    }

    resetConfig (signInConfig: ActiveDirectoryConfig = null) {
        if (signInConfig) {
            this.username = signInConfig.username
            this.password = signInConfig.password
            this.url = signInConfig.url
            this.baseDN = signInConfig.baseDN
        }
        this.isValid = !!this.username && !!this.password && !!this.url && !!this.baseDN
    }

    provideConfig () : ActiveDirectoryConfig {
        return {
            username: this.username,
            password: this.password,
            url: this.url,
            baseDN: this.baseDN
        }
    }
}
