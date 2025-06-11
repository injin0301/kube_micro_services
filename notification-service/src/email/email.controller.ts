import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { CreateEmailDto } from './schemas/create-email.dto';
import { UpdateEmailDto } from './schemas/update-email.dto';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('order.created')
  remove(@Payload() id: number) {
    return this.emailService.sendOrderCreated(id);
  }
}
