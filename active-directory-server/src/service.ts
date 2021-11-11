import { Injectable } from '@nestjs/common'
import { ActiveDirectory, AddPayload, DeletePayload, ModifyPayload, SearchPayload } from './activeDirectory'
import { Converter } from './converter'

export type ConnectParams = {
    url: string,
}

export type Credentials = {
    username: string,
    password: string,
}

@Injectable()
export class ActiveDirectoryService {
    // eslint-disable-next-line no-useless-constructor
    constructor (private readonly activeDirectory: ActiveDirectory, private readonly converter: Converter) {}

    async Search (query: SearchPayload): Promise<any> {
        const data = await this.activeDirectory.search(query)

        return data ?? {}
    }

    async Connect (query: ConnectParams): Promise<any> {
        const payload = { url: query.url }
        const response = await this.activeDirectory.connect(payload)

        return response
    }

    async Auth (credentials: Credentials): Promise<boolean> {
        try {
            const payload = {
                dn: credentials.username,
                password: credentials.password
            }
            const response = await this.activeDirectory.authenticate(payload)

            if (response === 'Successfully authenticated') return true

            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async AddEntry (payload: AddPayload): Promise<boolean> {
        try {
            const response = await this.activeDirectory.add(payload)

            if (response === 'Successfully added entry!') return true

            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async DeleteEntry (payload: DeletePayload): Promise<boolean> {
        try {
            const response = await this.activeDirectory.delete(payload)

            if (response === 'Successfully deleted entry!') return true

            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async ModifyEntry (payload: ModifyPayload): Promise<boolean> {
        try {
            const response = await this.activeDirectory.modify(payload)

            if (response === 'Successfully modified entry!') return true

            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async Logout (): Promise<boolean> {
        const response = await this.activeDirectory.logout()

        if (response === 'Successful logout!') return true
        return false
    }
}
