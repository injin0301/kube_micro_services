import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
// Adresse DNS du service Product ou Cart (doit être accessible dans le cluster)
import { urlCart } from 'src/config';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly oRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.oRepository.create(createOrderDto);
    return await this.oRepository.save(order);
  }

  async getCart(userId: string): Promise<Order> {
    const url = new URL('/cart', urlCart);
    const headers = { 'x-user-id': userId };

    console.log(`Fetching cart for user ${userId} from: ${url}`);

    try {
      const res = await fetch(url.toString(), { headers });

      if (!res.ok) {
        throw new Error(`Cart fetch failed with status ${res.status}`);
      }

      const cart = await res.json();

      // TODO: Optionnel — appeler le Product Service pour vérifier les produits/prix

      const order = this.oRepository.create({
        userId,
        productList: cart.productList,
        totalPrice: cart.totalPrice,
        status: 'PENDING',
      });

      await this.oRepository.save(order);

      console.log(`Order created successfully for user ${userId}`);

      return order;
    } catch (err) {
      console.error(`Error in getCart(${userId}):`, err);
      throw err;
    }
  }

  findAll(): Promise<Order[]> {
    return this.oRepository.find();
  }

  findOne(id: string): Promise<Order | null> {
    return this.oRepository.findOne({ where: { id } });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    Object.assign(order, updateOrderDto);
    return this.oRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    order.productList = [];
    order.totalPrice = 0;

    await this.oRepository.save(order);
    console.log(`Order ${id} cleared.`);
  }
}