import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import {
  expiresAccessToken,
  expiresRefreshToken,
  msecToSecond,
} from './config/appConfigs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Demo-Code example of NestJS')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('demo-code')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.NODE_PORT);
  console.log(`\nServer run with port ${process.env.NODE_PORT}`);
  console.log(
    `\nTokens expires:\n  access = ${msecToSecond(
      expiresAccessToken,
    )}s\n  refresh: ${msecToSecond(expiresRefreshToken)}s`,
  );
}

bootstrap();
