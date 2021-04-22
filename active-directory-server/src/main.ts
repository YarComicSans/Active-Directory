import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './module'
import * as dotenv from 'dotenv'

async function bootstrap () {
    dotenv.config({ path: './config.env' })
    const app = await NestFactory.create(AppModule, { cors: true })

    const config = new DocumentBuilder()
        .setTitle('Active Directory API')
        .setDescription('Active Directory API methods')
        .setVersion('1.0')
        .addTag('active-directory')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(3002)
}

bootstrap()
