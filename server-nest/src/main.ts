import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.NODE_PORT);
  console.log(`\nServer run with port ${process.env.NODE_PORT}`);
}

bootstrap();
