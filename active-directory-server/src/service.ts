import { Injectable } from '@nestjs/common'
import { ActiveDirectory } from './activeDirectory'
import { Converter } from './converter'
import { ActiveDirectoryConfigDto, UsersDto, UserSignInParams } from './types'

@Injectable()
export class ActiveDirectoryService {
    // eslint-disable-next-line no-useless-constructor
    constructor (private readonly activeDirectory: ActiveDirectory, private readonly converter: Converter) {}

    async GetUsers (query: any): Promise<UsersDto> {
        const users = await this.activeDirectory.GetUsers()

        if (!users) return { users: [], totalCount: 0 }
        const usersInfo = this.converter.userInfoToUserDto(users)
        // const usersInfo = this.converter.userInfoToUserDto(users.slice(query.skip, query.skip + query.limit))

        return usersInfo
    }

    async AuthenticateUser (signInParams: UserSignInParams): Promise<boolean> {
        try {
            const { username, password } = signInParams
            const response = await this.activeDirectory.AuthenticateUser(username, password)

            if (response.status === 'Ok') return true

            return false
        } catch (error) {
            return false
        }
    }

    async ResetConfig (newConfigDto: ActiveDirectoryConfigDto) {
        const newConfig = this.converter.configDtoToActiveDirectoryConfig(newConfigDto)

        await this.activeDirectory.ResetConfig(newConfig)
    }
}
