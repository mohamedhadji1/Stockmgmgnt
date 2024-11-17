import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../Models/Category';
import { Product } from '../Models/Product';
import { Order } from '../Models/Order';
import { Claim } from '../Models/Claim';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  GetAllCategorys(){
    return this.http.get<Category[]>('http://localhost:8081/category/show');
  }

  AddCategory(c: Category){
    return this.http.post<Category>('http://localhost:8081/category/create', c);
  }

  UpdateCat(c: Category){
    return this.http.put<Category>('http://localhost:8081/category/update',c)
  }

  DeleteCat(id:number){
    return this.http.delete<string>('http://localhost:8081/category/'+id);
  }

  GetAllProducts(){
    return this.http.get<Product[]>('http://localhost:8081/api/products');
  }

  AddProduct(product: Product){
    return this.http.post<Product>('http://localhost:8081/api/products',product);
  }

  updateProduct(product : Product){
    return this.http.put<Product>('http://localhost:8081/api/products/'+product.id,product);
  }

  AddOrder(order:Order){
    console.log(order);
    return this.http.post<Order>('http://localhost:8081/order/create', order);
}

  GetOrders(){
    return this.http.get<Order[]>('http://localhost:8081/order/show');
  }

  UpdateOrder(order: Order){
    return this.http.put<Order>('http://localhost:8081/order/update',order)
  }

  AddClaim(claim: Claim){
    return this.http.post<Claim>('http://localhost:8081/claim/create',claim);
  }

  GetAllClaims(){
    return this.http.get<Claim[]>('http://localhost:8081/claim/show');
  }

}
