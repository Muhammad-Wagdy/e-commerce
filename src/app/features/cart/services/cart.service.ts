import { Injectable } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { STORED_KEYS } from '../../../core/constants/StoredKeys';
import { CartData, ICartResponse } from '../interfaces/ICartResponse';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseHTTP {
  //variables
  userCart!: CartData;

  getCart() {
    this.http
      .get<ICartResponse>(APP_APIS.Cart.data, {
        headers: {
          token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.userCart = response.data;
        },
      });
  }
}
