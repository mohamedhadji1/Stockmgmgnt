import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('user'); // Check if user is logged in
    if (isLoggedIn) {
      return true; // Allow access if logged in
    }
    this.router.navigate(['/register']); // Redirect to register if not logged in
    return false; // Deny access
  }
}
