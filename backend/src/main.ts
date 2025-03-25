import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose'
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  //mongoose.connect('mongodb://localhost:27017/nest-blog-api.posts')
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '../../tota_frontend/dist'))
  //app.useStaticAssets('public');

  const config = new DocumentBuilder()
  .setTitle('TA Blog API')
  .setDescription('Proccess to TA')
  .setVersion('1.0')
  //.addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(5000);
}
bootstrap();
