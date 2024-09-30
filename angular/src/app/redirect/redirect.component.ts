import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: ''
})
export class RedirectComponent {
  constructor(private router: Router) {
    const isLoggedIn = !!localStorage.getItem('user'); // Check if user is logged in
    if (isLoggedIn) {
      this.router.navigate(['/products']); // Redirect to home if logged in
    } else {
      this.router.navigate(['/register']); // Redirect to register if not logged in
    }
  }
}
