import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.npm_package_name?.toUpperCase() ?? 'CART_SERVICE',
        transport: Transport.NATS,
        options: {
          gracefulShutdown: true,
          servers: [process.env.NATS_URL || 'nats://nats:4222'],
        }
      },
    ]),
    TypeOrmModule.forFeature([Cart]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
