import { APP_APIS } from './../../../core/constants/app-apis';
import { Injectable } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { CartData, ICartResponse } from '../interfaces/ICartResponse';
import { BehaviorSubject, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseHTTP {
  //variables
  userCart: CartData | null = null;
  numOfCartItems = new BehaviorSubject<number>(0)

  public isCartPopupOpen = new BehaviorSubject<boolean>(false);

  openCartPopup(): void {
    this.isCartPopupOpen.next(true);
  }

  closeCartPopup(): void {
    this.isCartPopupOpen.next(false);
  }

  toggleCartPopup(): void {
    this.isCartPopupOpen.next(!this.isCartPopupOpen.value);
  }


  private readonly SAVINGS = 150;
  private readonly TAX_RATE = 0.14;

  get PriceWithoutTaxes(): number {
    return this.userCart?.totalCartPrice || 0;
  }

  get savings(): number {
    return this.SAVINGS;
  }

  get tax(): number {
    return this.PriceWithoutTaxes * this.TAX_RATE;
  }

  get PriceWithTaxes(): number {
    return this.PriceWithoutTaxes - this.savings + this.tax;
  }

  getCart() {
    if (!this.isBrowser) return;
    return this.http
      .get<ICartResponse>(APP_APIS.Cart.data)
  }
  addToCart(productId : string) {
        if (!this.isBrowser) return EMPTY;

    return this.http.post<ICartResponse>(APP_APIS.Cart.data,{
      productId : productId
    })
  }
    updateCart(count : number,productId : string):void{
          if (!this.isBrowser) return;

    this.http.put<ICartResponse>(`${APP_APIS.Cart.data}/${productId}`,{
      count:count
    }).subscribe({
      next: (response)=>{
        this.userCart = response.data
        this.numOfCartItems.next(response.numOfCartItems);
      }
    })
  }
  deleteCartItem(productId : string):void{
        if (!this.isBrowser) return;

    this.http.delete<ICartResponse>(`${APP_APIS.Cart.data}/${productId}`).subscribe({
      next:(response)=>{
        this.userCart = response.data
        this.numOfCartItems.next(response.numOfCartItems);
      },
      error:()=>{
      }
    })
  }
  clearCart():void{
        if (!this.isBrowser) return;

    this.http.delete(APP_APIS.Cart.data).subscribe({
      next:()=>{
        if(this.userCart){
          this.userCart.products = [],
          this.userCart.totalCartPrice = 0
        }
        this.numOfCartItems.next(0)
      },
      error:(error)=>{
        console.error('Error clearing cart:', error);
      }
    })
  }
}
