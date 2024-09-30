import { Product } from "./Product";
import { User } from "./User";

export class Order {
    id!: number;
    date!: Date;
    products!: Map<number, number>; // Product with quantity
    client: User | undefined;
    agent: User | undefined;
    tva!:number;
    totalPrice!:number
  }