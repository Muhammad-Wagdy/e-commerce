import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { allProducts } from '../../../../core/interfaces/IAllProductsResponse';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ICartResponse } from '../../../cart/interfaces/ICartResponse';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-products',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent implements OnInit, OnDestroy {
  @Input({ required: true }) product!: allProducts;

  // loading states
  isLoadingCart = false;
  isLoadingWishlist = false;

  // local wishlist state (per card)
  isInWishlist = false;

  // subscription management
  private wishlistSubscription?: Subscription;
  private isInitialized = false;

  // services
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  ngOnInit(): void {
    // Check if this product is in the wishlist on init
    this.checkWishlistStatus();
  }

  ngOnDestroy(): void {
    // Cleanup subscription
    this.wishlistSubscription?.unsubscribe();
  }

  /* ---------------- WISHLIST STATUS CHECK ---------------- */
  checkWishlistStatus(): void {
    // Subscribe to wishlist IDs from the service
    this.wishlistSubscription = this.wishlistService.wishlistProductIds$.subscribe({
      next: (ids) => {
        // Only update from subscription on initial load, not after user interactions
        if (!this.isInitialized) {
          this.isInWishlist = ids.includes(this.product._id);
          this.isInitialized = true;
        }
      }
    });
  }

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
    // Store previous state for error rollback
    const previousState = this.isInWishlist;

    // Toggle icon immediately for instant feedback
    this.isInWishlist = !this.isInWishlist;
    this.isLoadingWishlist = true;

    // Determine API call based on PREVIOUS state (before toggle)
    // If it WAS in wishlist (solid) -> DELETE
    // If it WASN'T in wishlist (regular) -> ADD
    const request = previousState
      ? this.wishlistService.deleteFromWishlist(productId)
      : this.wishlistService.addToWishlist(productId);

    request.subscribe({
      next: () => {
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
        // Revert the icon on error
        this.isInWishlist = previousState;
        this.isLoadingWishlist = false;
        this.toastrService.error(
          'Failed to update wishlist',
          undefined,
          {
            positionClass: 'toast-bottom-right',
          }
        );
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
