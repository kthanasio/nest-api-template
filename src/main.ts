import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientesModule } from './clientes/clientes.module';
import swaggerConfig from 'src/common/swaggerConfig';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  await swaggerConfig(app, [ClientesModule]);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(configService.get('APPLICATION_PORT') || 3000);
}
bootstrap();
