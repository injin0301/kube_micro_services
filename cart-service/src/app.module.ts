import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { CartService } from './cart/cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart/entities/cart.entity';
import { CartController } from './cart/cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService],
})
export class AppModule {}
