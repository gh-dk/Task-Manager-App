import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  previewImage: string;

  updateProfileForm: FormGroup
  constructor(public userService: UserService) {
    this.updateProfileForm = new FormGroup({
      username: new FormControl(userService.userData.username, Validators.required),
      contact: new FormControl(userService.userData.contact, [
        Validators.required,
        Validators.minLength(10),
      ]),
      email: new FormControl(userService.userData.email, [Validators.required, Validators.email]),
      // password: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(8),
      // ]),
      profilePic: new FormControl(''),
    });

    this.previewImage = userService.toUrl(userService.userData.profilePic)
  }

  submitForm() {
    this.userService.updateUser(this.updateProfileForm.value)
  }

  fileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.updateProfileForm.get('profilePic')?.setValue(input.files[0]);
      console.log(this.updateProfileForm.value);

      // preview image
      this.previewImage = URL.createObjectURL(input.files[0]);
    }
  }
}
