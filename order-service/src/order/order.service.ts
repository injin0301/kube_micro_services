import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DeepPartial, Repository } from 'typeorm';
// Adresse DNS du service Product ou Cart (doit être accessible dans le cluster)
import { cartApiUrl, productApiUrl } from 'src/config';

import { v5 as uuidv5 } from 'uuid';
import { OrderStatus } from './entities/interface';


const stockAvailable = async (productId: string): Promise<boolean> => {
  const url = new URL(`/products/${productId}`, productApiUrl);
  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Product fetch failed with status ${res.status}`);
    }
    const product = await res.json();
    return product.isAvailable;
  } catch (err) {
    console.error(`Error checking stock for product ${productId}:`, err);
    return false;
  }
};

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly oRepository: Repository<Order>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.oRepository.create(createOrderDto);
    return await this.oRepository.save(order);
  }

  async getCart(userId: string, id: string): Promise<Order> {
    const url = new URL(`/cart/${id}`, cartApiUrl);
    const headers = { 'x-user-id': userId };

    console.log(`Fetching cart for user ${userId} from: ${url}, id: ${id}`);

    // 1) Récupérer le panier
    const res = await fetch(url.toString(), { headers });
    if (!res.ok) {
      throw new HttpException(`Cart fetch failed with status ${res.status}`, HttpStatus.BAD_REQUEST);
    }
    const cart = await res.json();

    // 2) Vérifier la disponibilité de chaque produit
    const unavailable: any[] = [];
    for (const item of cart.products || []) {
      const ok = await stockAvailable(item.productId.toString());
      if (!ok) {
        unavailable.push(item.id);
      }
    }
    if (unavailable.length) {
      throw new HttpException(
        `Produit(s) non disponible(s) : ${unavailable.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // 3) Créer et sauvegarder la commande
    const payload = {
      userId: uuidv5(userId, uuidv5.URL),
      productList: cart.products,
      totalPrice: isNaN(cart.products.reduce((sum: number, p: { quantity: number; price: number; }) => sum + p.quantity * p.price, 0)) ? 12 : cart.products.reduce((sum: number, p: { quantity: number; price: number; }) => sum + p.quantity * p.price, 0), // exemple
      status: OrderStatus.PENDING,
    } as DeepPartial<Order>;

    const order = this.oRepository.create(payload);
    await this.oRepository.save(order);

    console.log(`Order created successfully for user ${userId}`);
    return order;
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

  async deleteOrder(id: string): Promise<boolean> {
    const order = await this.findOne(id);
    try {
      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }

      await this.oRepository.delete(id);
      console.log(`Order ${id} deleted successfully.`);
      return true
    } catch (error) {
      console.error(`Error deleting order ${id}:`, error);
      throw false;
    }
  }
}