import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { RegisterService } from '../Services/register-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private registerService: RegisterService, private fb: FormBuilder, private route: Router) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      numtel: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  register() {
    this.errorMessage = null;
    if (this.userForm.valid) {
      this.registerService.registerUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          alert('User registered successfully');
          this.route.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          if (error.status === 409) {
            this.errorMessage = 'email mawjoud 3asba 🖕';
          }
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
