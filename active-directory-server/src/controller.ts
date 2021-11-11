import { Body, Controller, Get, Delete, HttpCode, HttpException, HttpStatus, Post, Put, Query } from '@nestjs/common'
import { AddPayload, SearchPayload } from './activeDirectory'
import { ActiveDirectoryService, ConnectParams, Credentials } from './service'
import { CredentialsPayload } from './types'

@Controller('active-directory')
export class AppController {
    // eslint-disable-next-line no-useless-constructor
    constructor (
    private readonly adService: ActiveDirectoryService
    ) {}

  @Get('users')
    async getUsers (@Query() query?: SearchPayload): Promise<any> {
        console.log(query)

        const payload = {
            dn: query?.dn ?? 'CN=Users'
        }
        console.log(1)
        const result = await this.adService.Search(payload)
        console.log(2)
        return result
    }

@Post('users')
  async addUser (@Body() query: AddPayload): Promise<any> {
      try {
          console.log(query)

          const result = await this.adService.AddEntry(query)
          return result
      } catch (e) {
          return e
      }
  }

  @Put('users')
async modifyUser (query: any) {
    try {
        await this.adService.ModifyEntry(null)
    } catch (e) {
        throw new HttpException(e, HttpStatus.NOT_MODIFIED)
    }
}

  @Delete('users')
  async deleteUser (query) {
      try {
          await this.adService.DeleteEntry(null)
      } catch (e) {
          throw new HttpException(e, HttpStatus.NOT_MODIFIED)
      }
  }

  @Post('auth')
  @HttpCode(202)
  async authenticateUser (@Body() payload: CredentialsPayload) {
      try {
          //   await this.adService.Connect({ url: payload.ldapUrl })
          //   await this.adService.Auth(payload as Credentials)
          return 'Authenticated'
      } catch (e) {
          throw new HttpException(e, HttpStatus.UNAUTHORIZED)
      }
  }
}

//   @Put('config')
//   async resetActiveDirectoryConfig (@Body() newConfigDto: ActiveDirectoryConfigDto): Promise<void> {
//       await this.adService.ResetConfig(newConfigDto)
//   }
