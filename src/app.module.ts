import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakConfigService } from './config/keycloak-config.service';
import { ConfigKeycloakModule } from './config/configKeycloak.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<TypeOrmModuleOptions>('DATABASE_TYPE', {
          infer: true,
        }),
        database: configService.get<string>('DATABASE_DATABASE_NAME'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<string>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigKeycloakModule],
    }),
    ClientesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AppService,
  ],
})
export class AppModule {}
