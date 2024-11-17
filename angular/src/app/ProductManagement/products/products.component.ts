import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/Category';
import { Product } from 'src/app/Models/Product';
import { Provider } from 'src/app/Models/Provider';
import { ProductService } from 'src/app/Services/product.service';
import { ProviderService } from 'src/app/Services/provider.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productForm!: FormGroup;
  updateProductForm: FormGroup;
  providers: Provider[] = [];
  categories: Category[] = [];
  products : Product[] = []
  product : Product;
  constructor(private ps:ProductService ,  private fb: FormBuilder, private providerService: ProviderService){

      this.productForm = this.fb.group({
        name: ['', Validators.required],
        quantity: [0, [Validators.required, Validators.min(1)]],
        price: [0, [Validators.required, Validators.min(0.01)]],
        category: [null, Validators.required],
        provider: [null, Validators.required],
      });
      this.updateProductForm = this.fb.group({
        name: ['', Validators.required],
        quantity: ['', Validators.required],
        price: ['', Validators.required],
        category: [null, Validators.required],
        provider: [null, Validators.required],
      });
      this.product = {
        id:0,
        name:'',
        price:0,
        quantity:0,
        date:new Date(),
        provider: {
          id: 0,
          name: '',
          address: '',
          phoneNumber: '',
          email: ''
        },
        category: {
          id: 0,
          name: ''
        },
      }
    }

  ngOnInit(){
    this.ps.GetAllProducts().subscribe((data)=>{
        this.products = data;
        this.loadProviders();
        this.loadCategories();
    });


  }

  loadCategories(): void {
    this.ps.GetAllCategorys().subscribe((data: Category[]) => {
      this.categories = data.filter(category => category != null);  // Filter out null values
    });
  }

  loadProviders(): void {
    this.providerService.GetAll().subscribe((data: Provider[]) => {
      this.providers = data.filter(provider => provider != null);  // Filter out null values
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      // Send the newProduct object to the backend
      newProduct.date = new Date();
      this.ps.AddProduct(newProduct).subscribe(response => {
        console.log('Product added successfully!', response);
      });
    } else {
      console.log('Form is not valid');
    }
  }
  loadProductData(product: Product): void {
    this.product = product;

    this.updateProductForm.patchValue({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      category: product.category,
      provider: product.provider,
    });
  }

  onUpdateSubmit(): void {
    if (this.updateProductForm.valid) {
      const updatedProduct = this.updateProductForm.value;
      updatedProduct.id = this.product.id;
      updatedProduct.date = this.product.date;
      console.log(updatedProduct);
      this.ps.updateProduct( updatedProduct).subscribe((response) => {
        console.log('Product updated successfully', response);
        // Close the modal
        //$('#update-product').modal('hide'); // Using jQuery to close Bootstrap modal

      // Refresh the list
        this.ngOnInit();
      });
    }
  }
}
