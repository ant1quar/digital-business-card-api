import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('port', 3000);
  await app.listen(port);
  Logger.log(`GraphQL Sandbox: http://localhost:${port}/graphql`, 'Bootstrap');
  Logger.log(`Health: http://localhost:${port}/health`, 'Bootstrap');
}

void bootstrap();
