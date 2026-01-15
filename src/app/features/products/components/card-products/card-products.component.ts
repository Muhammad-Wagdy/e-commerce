import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { allProducts } from '../../../../core/interfaces/IAllProductsResponse';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ICartResponse } from '../../../cart/interfaces/ICartResponse';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-products',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent {
  @Input({ required: true }) product!: allProducts;

  // loading states
  isLoadingCart = false;
  isLoadingWishlist = false;

  // local wishlist state (per card)
  isInWishlist = false;

  // services
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  /* ---------------- CART ---------------- */
  addToCart(productId: string): void {
    this.isLoadingCart = true;

    this.cartService.addToCart(productId).subscribe({
      next: (response) => this.successResponse(response),
      error: () => this.failedResponse(),
    });
  }

  /* ---------------- WISHLIST ---------------- */
  toggleWishlist(productId: string): void {
    this.isLoadingWishlist = true;

    const request$ = this.isInWishlist
      ? this.wishlistService.deleteFromWishlist(productId)
      : this.wishlistService.addToWishlist(productId);

    request$.subscribe({
      next: () => {
        this.isInWishlist = !this.isInWishlist;
        this.isLoadingWishlist = false;

        this.toastrService.success(
          this.isInWishlist
            ? 'Added to wishlist ❤️'
            : 'Removed from wishlist 💔',
          undefined,
          {
            positionClass: 'toast-bottom-right',
          }
        );
      },
      error: () => {
        this.isLoadingWishlist = false;
      },
    });
  }

  /* ---------------- RESPONSES ---------------- */
  successResponse(response: ICartResponse): void {
    this.cartService.numOfCartItems.next(response.numOfCartItems);
    this.isLoadingCart = false;

    this.toastrService.success(
      'Product added successfully <i class="fa-solid fa-cart-arrow-down"></i>',
      undefined,
      {
        enableHtml: true,
        positionClass: 'toast-bottom-right',
      }
    );
  }

  failedResponse(): void {
    this.isLoadingCart = false;
    this.toastrService.error(
      'Failed to add product <i class="fa-solid fa-circle-exclamation"></i>',
      undefined,
      {
        enableHtml: true,
        positionClass: 'toast-bottom-right',
      }
    );
  }
}
