import { Component, inject, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  imports: [RegisterFormComponent],
})
export class RegisterPageComponent implements OnInit{
    private readonly viewportScroller = inject(ViewportScroller)
  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0,0],{
      behavior:'smooth'
    })
  }
}

