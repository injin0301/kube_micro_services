import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendOrderCreated(id: number) {
    return `This action returns a #${id} email`;
  }
}
