import { Router } from '@angular/router';
import { RegisterComponent } from './../../register/register.component';
import { Component } from '@angular/core';
import { Role } from 'src/app/Models/Role.enum';
import { User } from 'src/app/Models/User';
import { RegisterService } from 'src/app/Services/register-service.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  currentUser!: User | null;

  constructor(private router: Router,private userService: RegisterService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user: User | null) => {
      this.currentUser = user; // Set currentUser
      console.log(this.currentUser);
    });
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'Admin';
  }

  logout() {
    this.userService.clearCurrentUser();
    this.router.navigate(['/login']);
    console.log('User logged out successfully');
  }
}
