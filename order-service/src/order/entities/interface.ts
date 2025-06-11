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