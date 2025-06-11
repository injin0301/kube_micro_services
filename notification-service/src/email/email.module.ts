import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name:
          process.env.npm_package_name?.toUpperCase() ?? 'NOTIFICATION_SERVICE',
      },
    ]),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
