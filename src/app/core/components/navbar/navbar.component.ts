import { Component, inject } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  private readonly authService = inject(AuthService);
  public readonly cartService = inject(CartService);

  isLoggedIn = this.authService.isLoggedIn;

  logOut() {
    this.authService.logOut();
  }

  openCart() {
    this.cartService.openCartPopup();
  }
}
