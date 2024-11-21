import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Models/Product';
import { ProductService } from '../Services/product.service';
import { Order } from '../Models/Order';
import { RegisterService } from '../Services/register-service.service';
import { User } from '../Models/User';
import { Role } from '../Models/Role.enum';
import { DocumentService } from '../Services/document.service';

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
  totalPrice: number = 0;
  clientList: User[] = [];
  agentList: User[] = [];
  orderEditForm: FormGroup;


  constructor(private fb: FormBuilder, private productService: ProductService, private userService: RegisterService, private documentService: DocumentService) {
    this.orderForm = this.fb.group({
      client: ['',Validators.required],
      agent: [null],
      date: [new Date(), Validators.required],
      tva: [19, Validators.required],
      products: this.fb.array([this.createProductFormGroup()]) // Initialize the FormArray for products
    });

    this.orderEditForm = this.fb.group({
      client: ['', Validators.required],
      date: ['', Validators.required],
      agent: ['', Validators.required],
      tva: ['', Validators.required],
      products: this.fb.array([])
    });
  }


  createProductFormGroup(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.productService.GetAllProducts().subscribe(products => {
      this.productList = products;
    });
    this.productService.GetOrders().subscribe(data=>{
      this.orders = data;
    })
    this.userService.getAllUsers().subscribe(users => {
      // Filter users by role
      this.clientList = users.filter(user => user.role === Role.Client);
      this.agentList = users.filter(user => user.role === Role.DeliveryAgent);
      console.log("Clients",this.clientList)
    });
    this.addProduct(); // Add the first product entry
  }


  get products(): FormArray {
    return this.orderForm.get('products') as FormArray;
  }

  addProduct(): void {
    const products = this.orderForm.get('products') as FormArray;
    products.push(this.createProductFormGroup());
  }

  // Remove a product row
  removeProduct(index: number): void {
    const products = this.orderForm.get('products') as FormArray;
    products.removeAt(index);
    this.calculateTotalPrice();  // Recalculate total price after removal
  }


  // Method to calculate total price based on products and their quantities
  calculateTotalPrice(): void {
    this.totalPrice = 0;

    // Check if this.order and this.order.products exist and are valid
    if (this.order && this.order.products) {
      // Iterate over each entry in the Map (productId => quantity)
      this.order.products.forEach((quantity, productId) => {
        // Find the product by productId in the productList
        const product = this.productList.find(p => p.id === productId);

        // If the product is found, add the price * quantity to the totalPrice
        if (product) {
          this.totalPrice += product.price * quantity;
        }
      });
    }
  }


  onSubmit() {
    console.log("Form Submission Triggered");
    console.log(this.orderForm.value);
    console.log("Submit Started");

    if (this.orderForm.valid) {
      console.log("Form is valid!");

      // Create the order object
      this.order = {
        id: 0,
        date: this.orderForm.value.date,
        client: this.orderForm.value.client,  // You can set the client from form if needed
        agent: this.orderForm.value.agent,   // You can set the agent from form if needed
        tva: this.orderForm.value.tva,
        totalPrice: 0,
        products: new Map<number, number>(
          this.orderForm.value.products.map(
            (item: { productId: any; quantity: number }) => [Number(item.productId), item.quantity] // Cast productId to number
          )
        ),
        items:[]
      };

      // filling items list

      Array.from(this.order.products.entries()).map(([productId, quantity]) => {
        // Find the product in the products list using its ID
        const product = this.productList.find(prod => prod.id === productId);

        // Return the product with updated quantity if found, otherwise return null
        if (product) {
          product.quantity = quantity
          this.order.items.push(product);
        }

      })


      // Step 1: Check Product Availability
      let allProductsValid = true; // Track if all products have sufficient quantities
      this.order.products.forEach((orderQuantity: number, productId: number) => {
        const product = this.productList.find(p => p.id === productId);

        if (product) {
          if (orderQuantity > product.quantity) {
            console.error(`Product ID: ${productId} has insufficient stock. Available: ${product.quantity}, Requested: ${orderQuantity}`);
            allProductsValid = false;
          }
        } else {
          console.error(`Product ID: ${productId} not found in productList.`);
          allProductsValid = false;
        }
      });

      // Step 2: If all quantities are valid, update products and proceed with the order submission

      if (allProductsValid) {
        console.log("All products have sufficient stock.");

        // Step 3: Update each product's quantity in the database
        this.order.products.forEach((orderQuantity: number, productId: number) => {
          const product = this.productList.find(p => p.id === productId);

          if (product) {
            const updatedProduct = { ...product, quantity: product.quantity - orderQuantity };

            // Call updateProduct() with the full updated product object
            this.productService.updateProduct(updatedProduct).subscribe(
              response => {
                console.log(`Product ID: ${productId} updated successfully with new quantity: ${updatedProduct.quantity}`);
              },
              error => {
                console.error(`Error updating product ID: ${productId}:`, error);
              }
            );
          }
        });

        // Calculate the total price after products have been updated
        this.calculateTotalPrice();
        this.order.totalPrice = this.totalPrice * (1 + this.order.tva / 100);



        this.productService.AddOrder(this.order).subscribe(response => {
          console.log('Order submitted successfully:', response);
        }, error => {
          console.error('Error submitting order:', error);
        });

      } else {
        console.error("Order could not be submitted due to insufficient stock.");
      }

    } else {
      // Form validation errors
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


  loadOrderForUpdate(order: Order): void {
    // Get the Map of productId and quantity
    const productsMap = order.products;

    // Explicitly type the array
    const productsArray: { product: Product, quantity: number }[] = [];

    // Loop through the productsMap to find the corresponding product from productList
    productsMap.forEach((quantity: number, productId: number) => {
      // Find the full product object in the productList based on the productId
      const product = this.productList.find(p => p.id === productId);
      if (product) {
        // If the product is found, push it with its quantity into the array
        productsArray.push({ product: product, quantity: quantity });
      }
    });

    // Patch the form with the order details (client, date, etc.)
    this.orderEditForm.patchValue({
      client: order.client,
      date: order.date,
      agent: order.agent,
      tva: order.tva
    });

    // Clear existing products and re-populate the form array with the full product objects and quantities
    const productsFormArray = this.orderEditForm.get('products') as FormArray;
    productsFormArray.clear(); // Remove any existing form controls

    // Add each full product object and quantity to the form array
    productsArray.forEach(item => {
      productsFormArray.push(this.fb.group({
        product: [item.product, Validators.required],  // Full product object
        quantity: [item.quantity, [Validators.required, Validators.min(1)]]  // Quantity
      }));
    });
  }




  onEditSubmit(): void {
    if (this.orderEditForm.valid) {
      const updatedOrder = this.orderEditForm.value;
      console.log(updatedOrder);

      // Send the updated order data to the server
      /*this.productService.UpdateOrder(updatedOrder).subscribe(response => {
        console.log('Order updated successfully:', response);
      }, error => {
        console.error('Error updating order:', error);
      });*/
    } else {
      console.error('Form is invalid.');
    }
  }


  get productsEdit(): FormArray {
    return this.orderEditForm.get('products') as FormArray;
  }

  generateDocument(invoice : Order) {


    const requestBody = {
      "document": "54sp501sH8U2vFFP4vpH",
      "apiKey": "YHFAU6I-3VBE3II-V6AYTGI-YQE3LYQ",
      format: 'pdf',
      data: {
        date: invoice.date,
        client: invoice.client?.username,
        agent: invoice.agent ? invoice.agent.username : 'No delivery agent', // Check if agent is null
        items: invoice.items.map(item => ({
          product: item.name, // Assuming the product has a 'name' field
          quantity: item.quantity, // Use the updated quantity from the order
          price: item.price, // Assuming the product has a 'price' field
        })),
        totalPrice: invoice.totalPrice,
      },
    };

    this.documentService.generateDocument(requestBody).subscribe(
      (response) => {
        if (response.status === 200 && response.data) {
          const downloadLink = response.data;
          this.downloadDocument(downloadLink);
        } else {
          console.error('Failed to generate document:', response.message);
        }
      },
      (error) => {
        console.error('Error generating document:', error);
      }
    );
  }

  downloadDocument(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GeneratedDocument.docx'; // Default name for the file
    link.target = '_blank';
    link.click();
  }

}
