import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Models/Product';
import { ProductService } from '../Services/product.service';
import { Order } from '../Models/Order';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent {
  orderForm: FormGroup;
  productList: Product[] = [];
  order!:Order;
  orders: Order[]  = [];
  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.orderForm = this.fb.group({
      client: [null], // Assuming client is selected from a dropdown
      agent: [null],  // Assuming agent is selected from a dropdown
      date: ['', Validators.required],
      tva: [0],
      products: this.fb.array([]) // Initialize the FormArray for products
    });
  }

  ngOnInit(): void {
    this.productService.GetAllProducts().subscribe(products => {
      this.productList = products;
    });
    this.productService.GetOrders().subscribe(data=>{
      this.orders = data;
    })
    this.addProduct(); // Add the first product entry
  }

  createProduct(): FormGroup {
    return this.fb.group({
      productId: [0, Validators.required], 
      quantity: [1, [Validators.required, Validators.min(1)]] 
    });
  }

  get products(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  addProduct() {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  // Submit the form
  onSubmit() {
    console.log("Form Submission Triggered"); // Add this line to check if the method is called
    console.log(this.orderForm.value); // Check the form values
    console.log("Submit Started");
    
    if (this.orderForm.valid) {
      console.log("Form is valid!"); // Add this line to confirm the form is valid
      this.order = {
        id: 0,
        date: this.orderForm.value.date,
        client: undefined,
        agent: undefined,
        tva: this.orderForm.value.tva,
        totalPrice: 0,
        products: new Map<number, number>(
          this.orderForm.value.products.map((item: { productId: number; quantity: number }) => [item.productId, item.quantity])
        )
      };
  
      // Calculate total price
      this.order.totalPrice = this.calculateTotalPrice(this.order.products);
      
      console.log(this.order); // Check the order structure
  
      // Submit logic (call the service to save the order)
      /*this.productService.AddOrder(this.order).subscribe(response => {
        console.log('Order submitted successfully:', response);
      }, error => {
        console.error('Error submitting order:', error); // Add error logging
      });*/
    }else {
      console.error("Form is invalid:");
      console.error("Client:", this.orderForm.get('client')?.errors);
      console.error("Agent:", this.orderForm.get('agent')?.errors);
      console.error("Date:", this.orderForm.get('date')?.errors);
      console.error("TVA:", this.orderForm.get('tva')?.errors);
      console.error("Products:", this.orderForm.get('products')?.errors);
  
      // Check each product control in the FormArray
      this.products.controls.forEach((control, index) => {
        console.error(`Product ${index}:`, control.errors);
      });
    }
  }
  

  // Method to calculate total price based on products and their quantities
  private calculateTotalPrice(products: Map<number, number>): number {
    let total = 0;

    products.forEach((quantity, productId) => {
      const product = this.productList.find(p => p.id === productId); // Find the product in the product list
      
      if (product) {
        total += product.price * quantity; // Calculate total price
      }
    });

    return total;
  }
}
