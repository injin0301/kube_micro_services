import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { urlCart } from 'src/config';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly oRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  getCart(userId: string): any {
    const url = new URL('/cart', urlCart)
    const headers = {
      'x-user-id': userId
    }

    const handle = (res: Response) => {
      console.log(res);
      
    }

    const request = fetch(url, {
      headers: headers
    }).then(handle)


    return null
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
