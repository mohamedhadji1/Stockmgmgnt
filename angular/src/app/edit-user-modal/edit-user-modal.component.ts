import { Component, Input } from '@angular/core';
import { User } from '../Models/User';
import { RegisterService } from '../Services/register-service.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
})
export class EditUserModalComponent {
  @Input() user!: User;

  constructor(private registerService: RegisterService) {}

  updateUser() {
    this.registerService.updateUser(this.user).subscribe(
      () => {
        console.log('User updated successfully');
        // Optionally, you can emit an event or call a method to close the modal
      },
      error => {
        console.error('Failed to update user', error);
      }
    );
  }
}
