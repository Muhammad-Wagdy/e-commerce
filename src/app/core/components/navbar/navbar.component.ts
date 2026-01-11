import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { AsyncPipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{
  @Input() isLogin: boolean = false;

  //injected services
  private readonly authService = inject(AuthService);
  public readonly cartService = inject(CartService);
  public readonly NgxSpinnerService = inject(NgxSpinnerService);

  openCart(): void {
    this.cartService.openCartPopup();
  }

  logOut() {
    this.authService.logOut();
  }
  ngOnInit(): void {
    this.cartService.getCart()
  }

}
