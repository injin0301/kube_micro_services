import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('stock')
export class Stock {
  @ApiProperty({
    description: 'Identifiant unique du stock',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Identifiant du produit associé',
    example: 42,
  })
  @Column()
  productId: number;

  @ApiProperty({
    description: 'Quantité en stock du produit',
    example: 150,
    type: 'integer',
  })
  @Column({ type: 'int' })
  quantity: number;
}