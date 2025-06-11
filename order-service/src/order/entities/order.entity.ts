import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IProduct } from './interface';

@Entity()
export class Order {
  @ApiProperty({ description: 'Identifiant unique de la commande', example: 'uuid-1234' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Identifiant de l’utilisateur', example: 'uuid-user-5678' })
  @Column('uuid')
  userId: string;

  @ApiProperty({ type: [Object], description: 'Liste des produits dans la commande', example: [{ id: 'prod-1', quantity: 2 }] })
  @Column('jsonb')
  productList: IProduct[];

  @ApiProperty({ description: 'Prix total de la commande', example: 150 })
  @Column('int')
  totalPrice: number;

  @ApiProperty({ enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'], default: 'PENDING' })
  @Column({
    type: 'enum',
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
}