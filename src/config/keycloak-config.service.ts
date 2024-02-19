import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private configService: ConfigService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.configService.get<string>('AUTH_SERVER_URL'),
      realm: this.configService.get<string>('AUTH_REALM'),
      clientId: this.configService.get<string>('AUTH_CLIENT_ID'),
      secret: this.configService.get<string>('AUTH_SECRET'),
      cookieKey: this.configService.get<string>('AUTH_COOKIE_KEY'),
      logLevels: ['warn'],
      useNestLogger: false,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
