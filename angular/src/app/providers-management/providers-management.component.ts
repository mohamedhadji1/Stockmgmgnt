import { Component } from '@angular/core';
import { Provider } from '../Models/Provider';
import { ProviderService } from '../Services/provider.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-providers-management',
  templateUrl: './providers-management.component.html',
  styleUrls: ['./providers-management.component.css']
})
export class ProvidersManagementComponent {

  providers : Provider[] = [];
  supplierForm : FormGroup;
  updateSupplierForm : FormGroup;
  provider : Provider;
  constructor(private ps:ProviderService, private fb:FormBuilder, private router:Router){
    this.supplierForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z\\s]+')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      email: ['', [Validators.email]],
      address: ['', Validators.required],
    });
    this.updateSupplierForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z\\s]+')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      email: ['', [Validators.email]],
      address: ['', Validators.required],
    });
    this.provider = {
      id:0,
      name:'',
      email:'',
      phoneNumber:'',
      address:''
    }
  }

  ngOnInit(){
    this.ps.GetAll().subscribe((providers) => {
      this.providers = providers;
      console.log(this.providers);
    });
  }

  loadProviders() {
    this.ps.GetAll().subscribe((providers) => {
      this.providers = providers;
      console.log(this.providers);
    });
  }
  onSubmit(){
    if (this.supplierForm.valid) {
      this.provider.name = this.supplierForm.value.name;
      this.provider.email = this.supplierForm.value.email;
      this.provider.phoneNumber = this.supplierForm.value.phoneNumber;
      this.provider.address = this.supplierForm.value.address;
      this.ps.Add(this.provider).subscribe((data)=>{
        console.log(data);
        this.supplierForm.reset();
        this.loadProviders();

      })
      
    }
  }



  openUpdateProviderModal(provider: Provider) {

    this.provider.id = provider.id;
    // Set the initial values for the form
    this.updateSupplierForm.patchValue({
      name: provider.name,
      phoneNumber: provider.phoneNumber,
      email: provider.email,
      address: provider.address,
    });
  }

  onUpdate() {
    if (this.updateSupplierForm.valid) {
      this.provider.address = this.updateSupplierForm.value.address
      this.provider.name = this.updateSupplierForm.value.name
      this.provider.phoneNumber = this.updateSupplierForm.value.phoneNumber
      this.provider.email = this.updateSupplierForm.value.email


      this.ps.update(this.provider).subscribe((data) => {
        console.log('Provider updated:', data);
        this.updateSupplierForm.reset();
        this.loadProviders(); // Reload providers after the update
        
      });
    }
  }
  
  
}
