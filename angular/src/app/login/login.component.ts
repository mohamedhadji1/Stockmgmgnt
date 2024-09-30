import { RegisterService } from './../Services/register-service.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/User';
import { Role } from '../Models/Role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private correctEmail = "contact@nemissiste.com";
  private correctPassword = "admin";

  email = '';
  password = '';

  constructor(private router: Router, private userservice : RegisterService) {}

  login(event: SubmitEvent) {
    event.preventDefault();
    console.log('Email before login:', this.email);
    console.log('Password before login:', this.password);

    const user: User = {
        email: this.email,
        password: this.password,
    };
    console.log('Login Payload:', user); // Log the payload

    this.userservice.login(user).subscribe({
        next: (response) => {
            console.log('Login successful', response);
            this.userservice.setCurrentUser(response);
            if (response.role === Role.Admin) {
                this.router.navigate(['/customers']);
            } else {
                this.router.navigate(['/products']);
            }
        },
        error: (error) => {
            console.error('Login failed', error);
        }
    });
}
}
