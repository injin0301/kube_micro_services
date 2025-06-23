import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.npm_package_name?.toUpperCase() ?? 'ORDER_SERVICE',
        transport: Transport.NATS,
        options: {
          gracefulShutdown: true,
          servers: [process.env.NATS_URL || 'nats://nats:4222'],
        } 
      },
    ]),
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
