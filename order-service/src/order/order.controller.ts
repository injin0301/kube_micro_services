import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

const userHeader = 'x-user-id';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Headers(userHeader) userId: string,
    @Body() createOrderDto: CreateOrderDto
  ) {
    return this.orderService.create(createOrderDto);
  }

  @Get('cart')
  getOrderCart(
    @Headers(userHeader) userId: string,
  ) {
    return this.orderService.getCart(userId)
  }


  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}
