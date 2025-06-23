import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Configuration de Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for the project')
    .setVersion('1.0')
    .addBearerAuth() // Ajouter l'authentification par token JWT
    .build();

  const cart = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('cart/api', app, cart); // Swagger accessible à l'URL /api  

  const configService = app.get(ConfigService);

  await app.startAllMicroservices()

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats:4222'],
    }
  })

  app.enableCors({
    origin: configService.get('http://localhost:3000'),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
