import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Put, Query } from '@nestjs/common'
import { ActiveDirectoryService } from './service'
import { ActiveDirectoryConfigDto, UsersDto, UserSignInParams } from './types'
import { Converter } from './converter'

@Controller('active-directory')
export class AppController {
    // eslint-disable-next-line no-useless-constructor
    constructor (
    private readonly adService: ActiveDirectoryService,
    private readonly converter: Converter
    ) {}

  @Get('users')
    async getUsers (@Query() fetchQuery): Promise<UsersDto> {
        const adQuery = this.converter.oDataToAdQuery(fetchQuery)
        const result = await this.adService.GetUsers(adQuery)
        return result
    }

  @Post('auth')
  @HttpCode(202)
  async authenticateUser (@Body() userSignInDto: UserSignInParams) {
      const isAuthenticated = await this.adService.AuthenticateUser(userSignInDto)

      if (isAuthenticated) {
          return 'Authenticated'
      } else {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: 'Could not authenticate user'
          }, HttpStatus.BAD_REQUEST)
      }
  }

  @Put('config')
  async resetActiveDirectoryConfig (@Body() newConfigDto: ActiveDirectoryConfigDto): Promise<void> {
      await this.adService.ResetConfig(newConfigDto)
  }
}
