import { Category } from "./Category";
import { Provider } from "./Provider";

export class Product{
    id!:number;
    name?:string;
    quantity!:number;
    price!:number;
    category?:Category;
    date!: Date;
    provider?:Provider;
}
