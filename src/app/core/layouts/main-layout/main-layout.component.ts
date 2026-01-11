import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CartPopupComponent } from "../../../features/cart/pages/cart-page/cart-popup.component";
import { CartService } from '../../../features/cart/services/cart.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarComponent, CartPopupComponent,AsyncPipe],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  public readonly cartService = inject(CartService)

}
