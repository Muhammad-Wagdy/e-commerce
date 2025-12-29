import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-auth-input',
  imports: [SvgIconComponent, ɵInternalFormsSharedModule],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AuthInputComponent),
    },
  ],
})
export class AuthInputComponent implements ControlValueAccessor {
  @Input() control: AbstractControl<String> | null = null;
  @Input() group: FormGroup | null = null;
  @Input() type: string = '';
  @Input() id: string = '';
  @Input() class: string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() autoComplete: string = 'off';

  value = '';
  disabled = false;
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.type = this.isPasswordVisible ? 'text' : 'password';
  }

  // Inside AuthInputComponent class

  // Ensure this matches the property you're updating in (input)
  get passwordConstrains() {
    // Only return constraints if this is the primary password field
    if (this.id !== 'UserPassword') return [];

    return [
      { message: 'At least one uppercase letter (A-Z)', check: /[A-Z]/.test(this.value) },
      { message: 'At least one lowercase letter (a-z)', check: /[a-z]/.test(this.value) },
      { message: 'At least one digit (0-9)', check: /\d/.test(this.value) },
      {
        message: 'At least one special character (e.g., !, @, #)',
        check: /[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]/.test(this.value),
      },
      { message: 'At least 8 characters in length', check: this.value.length >= 8 },
    ];
  }
}
