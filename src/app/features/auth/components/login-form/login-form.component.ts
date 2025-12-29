import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { interval, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthInputComponent } from '../auth-input/auth-input.component';
import { STORED_KEYS } from '../../../../core/constants/StoredKeys';

@Component({
  selector: 'app-login-form',
  imports: [RouterLink, ReactiveFormsModule, AuthInputComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
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

  loginForm!: FormGroup;

  constructor() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  submitData(): void {
    this.loginForm.markAllAsTouched();
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isLoading) return;

    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Login Successfully.';
          this.isLoading = false;
          localStorage.setItem(STORED_KEYS.USER_TOKEN, response.token);
          this.authService.setToken(response.token);
          this.authService.decodeToken(response.token);
          interval(1000)
            .pipe(take(3))
            .subscribe(() => {
              --this.redirectCounter;
              if (this.redirectCounter === 0) {
                this.router.navigateByUrl('/home');
              }
            });
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Incorrect email or password.';
        },
      });
    }
  }
}
