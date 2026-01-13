import { IWishlistResponse, wishlistData } from './../../interfaces/IWishlistResponse';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist-page',
  imports: [RouterLink],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css',
})
export class WishlistPageComponent implements OnInit{
  //injected Services
  public readonly wishlistService = inject(WishlistService)

  //variables
  wishlist : wishlistData[]= []
  count = 0

  ngOnInit(): void {
    this.getWishlist()
  }
  getWishlist(){
    this.wishlistService.getWishlist()?.subscribe({
      next:(response)=>{
        this.wishlist = response.data
        this.count = response.count
      }
    })
  }
  delete(productId: string) {
    this.wishlistService.deleteFromWishlist(productId).subscribe({
      next: (response) => {
        this.wishlist = response.data
        this.count = response.count
      },
    });
  }

}
