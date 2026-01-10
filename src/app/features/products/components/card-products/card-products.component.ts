import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { allProducts } from '../../../../core/interfaces/IAllProductsResponse';
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ICartResponse } from '../../../cart/interfaces/ICartResponse';

@Component({
  selector: 'app-card-products',
  imports: [RouterLink],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent {
  @Input({ required: true }) product!: allProducts;

  //variables
  isLoading = false

  //injected Services
  public readonly cartService = inject(CartService)
  public readonly toastrService = inject(ToastrService)

  addToCart(productId : string) : void{
    this.isLoading = true

    this.cartService.addToCart(productId).subscribe({
      next:(response)=>{
        this.successResponse(response)
      },
      error:(error: HttpErrorResponse)=>{
        this.failedResponse()
      }
    })
  }

  successResponse(response : ICartResponse):void{
    this.cartService.numOfCartItems.next(response.numOfCartItems)
    this.isLoading = false
    this.toastrService.success('Product added successfully <i class="fa-solid fa-cart-arrow-down"></i>',undefined,{
    enableHtml:true,
    positionClass:"toast-bottom-right"
    })
  }

  failedResponse():void{
    this.toastrService.error('failed to add the project <i class="fa-solid fa-circle-exclamation"></i>',undefined,{
    enableHtml:true,
    positionClass:"toast-bottom-right"
  })
  }
}
