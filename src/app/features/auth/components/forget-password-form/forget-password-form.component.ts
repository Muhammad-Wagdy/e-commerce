import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthInputComponent } from '../auth-input/auth-input.component';

@Component({
  selector: 'app-forget-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, AuthInputComponent, RouterLink],
  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.css',
})
export class ForgetPasswordFormComponent {
  // injected services
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);

  // variables
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  forgetPasswordForm!: FormGroup;

  constructor() {
    this.initForgetPasswordForm();
  }

  initForgetPasswordForm(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getPassword(): void {
    this.forgetPasswordForm.markAllAsTouched();
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isLoading) return;

    if (this.forgetPasswordForm.valid) {
      this.isLoading = true;

      this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Reset password link has been sent to your email.';
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Email address not found.';
        },
      });
    }
  }
}
