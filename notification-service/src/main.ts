import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats:4222'],
        queue: process.env.npm_package_name?.toUpperCase() ?? 'NOTIFICATION_SERVICE',
      }
    },
  );

  await app.listen();
}

bootstrap();
