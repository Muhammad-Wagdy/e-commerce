import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  imports: [RegisterFormComponent],
})
export class RegisterPageComponent {}
