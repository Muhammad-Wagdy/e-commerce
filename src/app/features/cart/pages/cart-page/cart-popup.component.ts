import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-popup',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart-popup.component.html',
  styleUrl: './cart-popup.component.css',
})
export class CartPopupComponent implements OnInit {
  // Output event to close the popup
  closePopup = output<void>();

  // Injected services
  public readonly cartServices = inject(CartService);

  // Variables
  get PriceWithoutTaxes(): number {
    return this.cartServices.PriceWithoutTaxes;
  }

  get savings(): number {
    return this.cartServices.savings;
  }

  get tax(): number {
    return this.cartServices.tax;
  }

  get PriceWithTaxes(): number {
    return this.cartServices.PriceWithTaxes;
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartServices.getCart()?.subscribe({
      next: (response) => {
        this.cartServices.userCart = response.data;
        this.cartServices.numOfCartItems.next(response.numOfCartItems);
      },
      error: (error) => {
        this.cartServices.userCart = null;
        this.cartServices.numOfCartItems.next(0);
      },
    });
  }

  updateItemCount(count: number, ProductId: string): void {
    if (count <= 0) {
      this.deleteCartItem(ProductId);
    } else {
      this.cartServices.updateCart(count, ProductId);
    }
  }

  deleteCartItem(productId: string): void {
    this.cartServices.deleteCartItem(productId);
  }

  clearCart(): void {
    this.cartServices.clearCart();
  }

  onClose(): void {
    this.closePopup.emit();
  }

  onCheckout(): void {
    this.closePopup.emit();
  }
}
