import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  
  async create(createCartDto: CreateCartDto, userId: number) {
    // Call the product service to check the availability of cart
    const cart = await this.cartRepository.create({
      ...createCartDto,
      userId: userId,
    });
    return this.cartRepository.save(cart);
  }

  async findOne(id: number, userId: number) {
    return this.cartRepository.findOneOrFail({
      where: {
        id: id,
        userId: userId,
      }
    })
  }

  async update(userId: number, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.findOneOrFail({ where: { userId } });
    Object.assign(cart, updateCartDto);
    return this.cartRepository.save(cart);
  }

  async remove(userId: number) {
    // Supprime le panier associé à l'utilisateur
    const cart = await this.cartRepository.findOneOrFail({ where: { userId } });
    return this.cartRepository.remove(cart);
  }
}
