import { Module } from '@nestjs/common';
import { ActiveDirectory } from './activeDirectory';
import { AppController } from './controller';
import { Converter } from './converter';
import { ActiveDirectoryService } from './service';

@Module({
  controllers: [AppController],
  providers: [ActiveDirectoryService, Converter, ActiveDirectory],
})
export class AppModule {}
