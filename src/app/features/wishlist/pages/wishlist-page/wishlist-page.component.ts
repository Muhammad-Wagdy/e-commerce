import { CartService } from './../../../cart/services/cart.service';
import { IWishlistResponse, wishlistData } from './../../interfaces/IWishlistResponse';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-wishlist-page',
  imports: [RouterLink, CurrencyPipe, NgxSpinnerModule],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css',
})
export class WishlistPageComponent implements OnInit{
  //injected Services
  public readonly wishlistService = inject(WishlistService);
  public readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  public readonly spinner = inject(NgxSpinnerService);

  //variables
  wishlist : wishlistData[] = []
  count = 0
  isLoading = true; // Add loading state

  // Loading states - track by product ID
  loadingCart = new Set<string>();
  loadingDelete = new Set<string>();

ngOnInit(): void {
  this.getWishlist();
}

  getWishlist() {
    this.spinner.show();

    this.wishlistService.getWishlist()?.subscribe({
      next: (response) => {
        this.wishlist = response.data;
        this.count = response.count;
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      }
    });
  }


  deleteFromWishlist(productId: string) {
    this.loadingDelete.add(productId);

    this.wishlistService.deleteFromWishlist(productId).subscribe({
      next: () => {
        // mutate locally instead of replacing array
        this.wishlist = this.wishlist.filter(
          item => item._id !== productId
        );

        this.count--;
        this.loadingDelete.delete(productId);

        this.toastrService.success('Removed from wishlist 💔', undefined, {
          positionClass: 'toast-bottom-right',
        });
      },
      error: () => {
        this.loadingDelete.delete(productId);
      }
    });
  }


  addToCart(productId: string): void {
    // Add to loading set
    this.loadingCart.add(productId);

    this.cartService.addToCart(productId).subscribe({
      next: (response) => {
        this.cartService.numOfCartItems.next(response.numOfCartItems);
        this.loadingCart.delete(productId);
        this.toastrService.success(
          'Product added to cart <i class="fa-solid fa-cart-arrow-down"></i>',
          undefined,
          {
            enableHtml: true,
            positionClass: 'toast-bottom-right',
          }
        );
      },
      error: () => {
        this.loadingCart.delete(productId);
        this.toastrService.error('Failed to add product', undefined, {
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  // Helper methods to check loading state
  isAddingToCart(productId: string): boolean {
    return this.loadingCart.has(productId);
  }

  isDeletingFromWishlist(productId: string): boolean {
    return this.loadingDelete.has(productId);
  }
}
