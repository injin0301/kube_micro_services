import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IProduct } from "./interface";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId: string

    @Column('array')
    productList: IProduct[]

    @Column('int')
    totalPrice: number
    
    @Column('string')
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
}
