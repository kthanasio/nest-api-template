import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const APP_NAME = process.env.npm_package_name;
const APP_VERSION = process.env.npm_package_version;

export const swaggerConfig = async function conf(
  app: INestApplication,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modules: any[],
): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`The ${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    .setContact(
      'Selia Fullservice',
      'https://www.selia.com.br/',
      'comercial@seliafullservice.com.br',
    )
    .addBearerAuth()
    .addOAuth2({
      type: 'oauth2',
      name: 'Selia',
      description: 'Login Selia Core',
      flows: {
        clientCredentials: {
          scopes: {},
          authorizationUrl:
            'http://localhost:8081/auth/realms/selia-core-auth/protocol/openid-connect/auth',
          tokenUrl:
            'http://localhost:8081/auth/realms/selia-core-auth/protocol/openid-connect/token',
        },
      },
    })
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: modules,
  };
  const document = SwaggerModule.createDocument(app, config, options);

  const customOptions = {
    customCss: '.swagger-ui .topbar { background-color: #503878; }',
    customfavIcon:
      'https://www.selia.com.br/wp-content/uploads/2023/07/cropped-favicon-png-180x180.webp',
  };
  SwaggerModule.setup('swagger-ui', app, document, customOptions);
};

export default swaggerConfig;
