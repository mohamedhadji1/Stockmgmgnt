import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/User';
import { RegisterService } from '../Services/register-service.service';
import { Role } from '../Models/Role.enum';
import { Product } from '../Models/Product';
import { ProductService } from '../Services/product.service';
import { Claim } from '../Models/Claim';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css']
})
export class AddClaimComponent {
  addClaimForm: FormGroup;
  users: User[] = [];
  products: Product[] = [];
  claim : Claim; 
  returns!: FormArray;


constructor(private fb: FormBuilder, private us: RegisterService, private ps: ProductService){
  this.addClaimForm = this.fb.group({
    client: [null, Validators.required],
    message: ['', Validators.required],
    returns: this.fb.array([]) // Initialize returns as an empty array
  });
  this.addReturn(); // Add one return form group initially
    this.claim = {
      id:0,
      date: new Date(),
      message: '',
      client: new User(),
      returns: []
    }
}



ngOnInit(): void {
  // Fetch users from API
  this.us.getAllUsers().subscribe((data) => {
    this.users = data.filter(user => user.role === Role.Client);
  });

  // Fetch products from API
  this.ps.GetAllProducts().subscribe((data) => {
    this.products = data;
  });

}

// Create a form group for 'Returns' 
createReturn(): FormGroup {
  return this.fb.group({
    product: [null, Validators.required],
    quantity: [0, Validators.required]
  });
}

// Add a new 'Return' form group
addReturn(): void {
  this.returns = this.addClaimForm.get('returns') as FormArray;
  this.returns.push(this.createReturn());
}

// Remove a 'Return' form group by index
removeReturn(index: number): void {
  this.returns = this.addClaimForm.get('returns') as FormArray;
  this.returns.removeAt(index);
}

// Handle form submission
onSubmit(): void {
  if (this.addClaimForm.valid) {
    this.claim.message = this.addClaimForm.value.message;
    this.claim.client = this.addClaimForm.value.client;
    this.claim.returns = this.addClaimForm.value.returns;

    //console.log(this.claim);
    this.ps.AddClaim(this.claim).subscribe((data)=>{
      console.log(data);
      alert('Claim submitted successfully!');

      // Reset the form
      this.addClaimForm.reset();
      // Optionally, if you want to reset the returns array:
      this.returns.clear(); // Clear the FormArray
      this.addReturn();
    })
  } else {
    console.log('Form is not valid!');
  }
}
}
