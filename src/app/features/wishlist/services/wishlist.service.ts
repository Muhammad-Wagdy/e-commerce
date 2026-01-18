// src/app/features/wishlist/services/wishlist.service.ts

import { Injectable } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { IWishlistResponse } from '../interfaces/IWishlistResponse';
import { BehaviorSubject, EMPTY, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService extends BaseHTTP {
  // Global state for wishlist product IDs
  private wishlistProductIds = new BehaviorSubject<string[]>([]);
  public wishlistProductIds$ = this.wishlistProductIds.asObservable();

  getWishlist() {
    if (!this.isBrowser) return;
    return this.http.get<IWishlistResponse>(APP_APIS.WishList.data).pipe(
      tap((response) => {
        // Update the global state with product IDs
        const ids = response.data.map((product) => product._id);
        this.wishlistProductIds.next(ids);
      })
    );
  }

  addToWishlist(productId: string) {
    if (!this.isBrowser) return EMPTY;
    return this.http
      .post<IWishlistResponse>(APP_APIS.WishList.data, {
        productId: productId,
      })
      .pipe(
        tap((response) => {
          // Update the global state
          const ids = response.data.map((product) => product._id);
          this.wishlistProductIds.next(ids);
        })
      );
  }

  deleteFromWishlist(productId: string) {
    if (!this.isBrowser) return EMPTY;

    return this.http
      .delete<IWishlistResponse>(`${APP_APIS.WishList.data}/${productId}`)
      .pipe(
        tap((response) => {
          // Update the global state
          const ids = response.data.map((product) => product._id);
          this.wishlistProductIds.next(ids);
        })
      );
  }
}
