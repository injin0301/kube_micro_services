import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import OrderCreateSchema from './schemas/order-create.schema';
import OrderUpdatedSchema from './schemas/order-updated.schema';
import OrderCancelledSchema from './schemas/order-cancelled.schema';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('order.created')
  handleOrderCreated(@Payload() data: OrderCreateSchema) {
    return this.emailService.sendOrderCreatedEmail(data);
  }

  @MessagePattern('order.updated')
  handleOrderUpdated(@Payload() data: OrderUpdatedSchema) {
    return this.emailService.sendOrderUpdatedEmail(data);
  }

  @MessagePattern('order.cancelled')
  handleOrderCancelled(@Payload() data: OrderCancelledSchema) {
    return this.emailService.sendOrderCancelledEmail(data);
  }
}
