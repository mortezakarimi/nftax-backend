import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  /**
   * Add versioning in the URLs
   */
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.use(helmet());

  app.enableCors({
    exposedHeaders: ['Link', 'Content-Disposition'],
  });

  app.use(morgan('dev'));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('NFTax')
    .setDescription('Manage accounts NFT')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'NFTax',
  });

  await app.listen(configService.get<number>('PORT', 5000));
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
