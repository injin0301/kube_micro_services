import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IProduct } from "./interface";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId: string

    @Column('jsonb')
    productList: IProduct[]

    @Column('int')
    totalPrice: number
    
    @Column({
        type: "enum",
        enum: ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"],
        default: "PENDING"
    })
    status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED",
}
