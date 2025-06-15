import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    CartModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
