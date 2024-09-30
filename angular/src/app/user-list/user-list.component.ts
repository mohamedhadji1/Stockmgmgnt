import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { RegisterService } from '../Services/register-service.service';
import { Role } from '../Models/Role.enum';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentUser!: User | null;
  dialogRef: MatDialogRef<EditUserModalComponent> | null = null; // Initialize as null

  constructor(private registerService: RegisterService, private snackBar: MatSnackBar , private dialog: MatDialog) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.registerService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Failed to load users', error);
      }
    );
  }

  openEditModal(user: User) {
    const modal = document.getElementById('edit-units');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
    this.currentUser = user;
  }

  closeEditModal() {
    const modal = document.getElementById('edit-units');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
  }

  updateUserRole(user: User) {
    const newRole = prompt('Enter new role:', user.role || '');
    if (newRole) {
      if (newRole === 'Admin' || newRole === 'Client' || newRole === 'DeliveryAgent') {
        user.role = newRole as Role;
        this.registerService.updateUser(user).subscribe(
          response => {
            console.log('User role updated successfully', response);
          },
          error => {
            console.error('Failed to update user role', error);
          }
        );
      } else {
        console.error('Invalid role entered');
      }
    }
  }

  deleteUser(userId?: number) {
    if (userId === undefined) {
      console.error('User ID is undefined');
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      this.registerService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.loadUsers();
        },
        error => {
          console.error('Failed to delete user', error);
        }
      );
    }
  }
  user!: User;
  updateUser() {
    if (!this.currentUser) {
      console.error('No user selected for update');
      return;
    }

    this.registerService.updateUser(this.currentUser).subscribe(response => {
      console.log('User updated successfully', response);
      this.snackBar.open('Update Success!', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    }, error => {
      console.error('Error updating user', error);
    });
  }
  openEditUserDialog(user: User) {
    this.dialogRef = this.dialog.open(EditUserModalComponent, {
      data: user
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.currentUser = null;
    });
  }

  saveUser(user: User) {
    this.registerService.updateUser(user).subscribe({
      next: () => this.snackBar.open('User updated successfully!', 'Close', { duration: 2000 }),
      error: () => this.snackBar.open('Error updating user.', 'Close', { duration: 2000 })
    });
  }
}
