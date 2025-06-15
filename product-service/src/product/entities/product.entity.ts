import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @ApiProperty({
    description: 'Identifiant unique du produit',
    example: '3cb46d8e-b99f-4dd6-b631-7a34cb29c6a4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nom du produit',
    example: 'T-shirt Noir',
    maxLength: 255,
  })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({
    description: 'Description détaillée du produit',
    example: 'T-shirt 100% coton, coupe regular fit.',
    type: 'string',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    description: 'Prix unitaire du produit',
    example: 25.99,
    type: 'number',
    format: 'decimal',
  })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'URL de l’image du produit',
    example: 'https://cdn.example.com/images/prod-1.png',
    required: false,
  })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({
    description: 'Quantité en stock',
    example: 120,
    default: 0,
  })
  @Column({ default: 0 })
  stock: number;

  @ApiProperty({
    description: 'Date de création de l’enregistrement',
    example: '2025-06-15T12:34:56.789Z',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour de l’enregistrement',
    example: '2025-06-15T12:34:56.789Z',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}