import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LoadingSpinnerComponent } from "../../../../shared/components/loading-spinner/loading-spinner.component";
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [LoadingSpinnerComponent,RouterLink,CurrencyPipe],
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
