import { ApiProperty } from "@nestjs/swagger";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number|0;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductItem {
  @ApiProperty({ example: 'prod-1', description: 'Identifiant du produit' })
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantité du produit' })
  quantity: number;
}


export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}