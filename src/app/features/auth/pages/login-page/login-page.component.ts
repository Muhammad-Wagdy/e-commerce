import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit{
  private readonly viewportScroller = inject(ViewportScroller)
  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0,0],{
      behavior:'smooth'
    })
  }
}
