import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IProduct, OrderStatus, ProductItem } from './interface';

@Entity()
export class Order {
  @ApiProperty({ description: 'Identifiant unique de la commande', example: '3cb46d8e-b99f-4dd6-b631-7a34cb29c6a4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Identifiant de l’utilisateur', example: '91b8fc72-65d1-4e5d-b831-84a93eaa4b24' })
  @Column('uuid')
  userId: string;

  @ApiProperty({
    type: [ProductItem],
    description: 'Liste des produits dans la commande',
  })
  @Column('jsonb')
  productList: ProductItem[];

  @ApiProperty({ description: 'Prix total de la commande', example: 150 })
  @Column('int')
  totalPrice: number;

  @ApiProperty({
    enum: OrderStatus,
    default: OrderStatus.PENDING,
    description: 'Statut de la commande',
  })
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
}