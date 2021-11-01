import { Body, Controller, Get, Delete, HttpCode, HttpException, HttpStatus, Post, Put, Query } from '@nestjs/common'
import { ActiveDirectoryService } from './service'
import { ActiveDirectoryConfigDto, UsersDto, CredentialsPayload } from './types'
import { Converter } from './converter'

@Controller('active-directory')
export class AppController {
    // eslint-disable-next-line no-useless-constructor
    constructor (
    private readonly adService: ActiveDirectoryService,
    private readonly converter: Converter
    ) {}

  @Get('users')
    async getUsers (): Promise<UsersDto> {
        const result = await this.adService.GetUsers()
        return result
    }

  @Put('users')
  async updateUsers () {
      try {
          await this.adService.updateUsers()
      } catch (e) {
          throw new HttpException(e, HttpStatus.NOT_MODIFIED)
      }
  }

  @Delete('users')
  async deleteUser () {
      try {
          await this.adService.deleteUser()
      } catch (e) {
          throw new HttpException(e, HttpStatus.NOT_MODIFIED)
      }
  }

  @Post('auth')
  @HttpCode(202)
  async authenticateUser (@Body() payload: CredentialsPayload) {
      try {
          await this.adService.AuthenticateUser(payload)

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
