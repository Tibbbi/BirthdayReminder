// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
 

  constructor(private fb: FormBuilder, private authService: AuthService , private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.createPasswordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Navigate to login or dashboard after successful registration
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[\W_]+/.test(value); // This checks for any non-word character or underscore
      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
      if (!valid) {
        return { strong: 'Your password is weak. Use [A-Z], [a-z], [1-9], [.*&!] characters' };
      }
      return null;
    };

    
  }
  getErrorMsg(field: string): string {
    const control = this.registerForm.get(field);
    if (control && control.hasError('required')) {
      return 'Please enter a ' + field;
    } else if (control && control.hasError('email')) {
      return 'Please enter a valid email';
    } else if (control && control.hasError('strong')) {
      return control.getError('strong');
    }
    return '';
  }

  passwordMatchValidator(fg: FormGroup): ValidationErrors | null {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  


  
}
