// src/app/features/wishlist/services/wishlist.service.ts

import { Injectable } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { IWishlistResponse } from '../interfaces/IWishlistResponse';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService extends BaseHTTP{

  getWishlist(){
    if (!this.isBrowser) return
      return this.http.get<IWishlistResponse>(APP_APIS.WishList.data)
  }
  addToWishlist(productId : string){
    if (!this.isBrowser) return EMPTY
    return this.http.post<IWishlistResponse>(APP_APIS.WishList.data,{
      productId : productId
    })
  }
  deleteFromWishlist(productId : string){
    if (!this.isBrowser) return EMPTY

    return this.http.delete<IWishlistResponse>(`${APP_APIS.WishList.data}/${productId}`)

  }
}
