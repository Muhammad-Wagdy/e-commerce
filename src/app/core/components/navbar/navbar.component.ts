import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { AsyncPipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{

  private readonly authService = inject(AuthService);
  public readonly cartService = inject(CartService);
  public readonly router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;
  isMenuOpen = false;

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isMenuOpen = false; // 👈 close menu on route change
      });
  }
  logOut() {
    this.authService.logOut();
  }

  openCart() {
    this.cartService.openCartPopup();
  }

}
