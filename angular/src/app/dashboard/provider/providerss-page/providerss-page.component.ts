import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provider } from 'src/app/Models/Provider';
import { ProviderService } from 'src/app/Services/provider.service';

@Component({
  selector: 'app-providerss-page',
  templateUrl: './providerss-page.component.html',
  styleUrls: ['./providerss-page.component.css']
})
export class ProviderssPageComponent {
  supplierForm: FormGroup;
  provider: Provider;
  providers : Provider[] = [];
  constructor(private fb: FormBuilder, private ps:ProviderService) {
    this.supplierForm = this.fb.group({
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

  ngOnInit(): void {
    this.ps.GetAll().subscribe((data)=>{
      this.providers = data;
      console.log(data);
    })
  }

  onSubmit() {
    if (this.supplierForm.valid) {
      this.provider.name = this.supplierForm.value.name;
      this.provider.email = this.supplierForm.value.email;
      this.provider.phoneNumber = this.supplierForm.value.phoneNumber;
      this.provider.address = this.supplierForm.value.address;
      this.ps.Add(this.provider).subscribe((data)=>{
        console.log(data);
        this.supplierForm.reset();
      })
      
    }
  }
}
