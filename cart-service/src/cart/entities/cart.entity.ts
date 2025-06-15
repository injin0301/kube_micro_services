import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
    
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'jsonb' })
  products: {
    productId: number;
    quantity: number;
  }[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
