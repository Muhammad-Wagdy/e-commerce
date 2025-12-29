import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  //injected services
  public readonly cartServices = inject(CartService);
  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this.cartServices.getCart();
  }
}
