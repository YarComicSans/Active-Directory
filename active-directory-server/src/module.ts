import { Module } from '@nestjs/common'
import { ActiveDirectory } from './activeDirectory'
import { Config } from './config'
import { AppController } from './controller'
import { Converter } from './converter'
import { ActiveDirectoryService } from './service'

@Module({
    controllers: [AppController],
    providers: [ActiveDirectoryService, Converter, ActiveDirectory, Config]
})
export class AppModule {}
