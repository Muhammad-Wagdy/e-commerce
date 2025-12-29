import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { interval, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthInputComponent } from '../auth-input/auth-input.component';
import { PASSWORD_REGEX, PHONE_REGEX } from '../../interfaces/validators';

@Component({
  selector: 'app-register-form',
  imports: [RouterLink, ReactiveFormsModule, AuthInputComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  //injected services
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  //variables
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  redirectCounter = 3;
  isPasswordVisible = false;
  isRePasswordVisible = false;
  registerForm!: FormGroup;

  constructor() {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
        rePassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      },
      { validators: this.passwordMissMatch }
    );
  }

  passwordMissMatch(registerForm: AbstractControl) {
    const password = registerForm.get('password')?.value;
    const rePassword = registerForm.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      return { passwordMissMatch: true };
    }
  }

  submitData(): void {
    this.registerForm.markAllAsTouched();
    this.errorMessage = '';
    this.successMessage = '';
    if (this.isLoading) return;
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.signup(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Account Created Successfully.';
          interval(1000)
            .pipe(take(3))
            .subscribe(() => {
              --this.redirectCounter;
              if (this.redirectCounter === 0) {
                this.router.navigateByUrl('/login');
              }
            });
          console.log(response);
          console.log(this.registerForm);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMessage = error.error.message;
        },
      });
    }
  }
}
