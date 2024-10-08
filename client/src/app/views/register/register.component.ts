import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { passwordMatchValidator } from '../../validators/passwordMatchValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  previewImage: string | undefined =
    'https://statusenergy.ca/wp-content/uploads/2018/12/no-image.png';

  constructor(public userService: UserService) {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        contact: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          // Validators.maxLength(10),

          // Validators.pattern('^[0-9]{10}$'),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        profilePic: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchValidator() }
    );
  }

  fileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.registerForm.get('profilePic')?.setValue(input.files[0]);
      console.log(this.registerForm.value);

      // preview image
      this.previewImage = URL.createObjectURL(input.files[0]);
    }
  }

  submitForm() {
    // Object.keys(this.registerForm.controls).forEach((key) => {
    //   const controlErrors = this.registerForm.get(key)?.errors;
    //   if (controlErrors) {
    //     console.log('Errors in ' + key + ':', controlErrors);
    //   }
    // });

    if (this.registerForm.valid) {
      this.userService.addUser(this.registerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  validateInput() {
    const contactControl = this.registerForm.get('contact');
    if (contactControl) {
      let inputValue = contactControl.value;
      inputValue = inputValue.replace(/[^0-9]/g, '');
      contactControl.setValue(inputValue);
    }
  }
}
