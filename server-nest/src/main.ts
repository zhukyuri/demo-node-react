import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as os from 'os';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import {
  expiresAccessToken,
  expiresRefreshToken,
  msecToSecond,
} from './config/appConfigs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    }),
  );

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
  console.log('\nCounts of processors:', os.cpus().length);
  console.log('\nCORS to:', process.env.CLIENT_URL);
  console.log(
    `\nTokens expires:\n  access = ${msecToSecond(
      expiresAccessToken,
    )}s\n  refresh: ${msecToSecond(expiresRefreshToken)}s`,
  );
}

bootstrap();
