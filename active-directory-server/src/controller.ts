import { Controller, Get, Query } from '@nestjs/common';
import { ActiveDirectoryService } from './service';
import { UsersDto } from "./types";
import { Converter } from "./converter";

@Controller('active-directory')
export class AppController {
  constructor(private readonly adService: ActiveDirectoryService, private readonly converter: Converter) {}

  @Get('users')
  async getUsers(@Query() fetchQuery): Promise<UsersDto> {
      const adQuery = this.converter.oDataToAdQuery(fetchQuery)
      const result = await this.adService.GetUsers(adQuery)
      return result
  }
}
