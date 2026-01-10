  import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { ProductsService } from '../../services/products.service';
  import { LoadingSpinnerComponent } from "../../../../shared/components/loading-spinner/loading-spinner.component";
  import { RelatedProductsComponent } from "../../components/related-products/related-products.component";
  import { isPlatformBrowser, ViewportScroller } from '@angular/common';
  import { CartService } from '../../../cart/services/cart.service';
import { Product } from '../../interfaces/ISpecificProductResponse';

  @Component({
    selector: 'app-product-details',
    imports: [LoadingSpinnerComponent, RelatedProductsComponent],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css',
  })
  export class ProductDetailsComponent implements OnInit{
    //variables
    isLoading = false

    //INJECTED SERVICES
    private readonly activatedRoute = inject(ActivatedRoute)
    public readonly productsService = inject(ProductsService)
    public readonly viewportScroller = inject(ViewportScroller)
    public readonly cartService = inject(CartService)
    public readonly platform = inject(PLATFORM_ID)
    productId!: string
    productDetails!: Product;


    ngOnInit(){
    this.activatedRoute.paramMap.subscribe({
        next:(params => {
          this.productId = params.get('id')!;
          this.getProductById();
          if (!isPlatformBrowser(this.platform)) {

            this.viewportScroller.scrollToPosition([0,0],{
            behavior:"smooth"
          })
          }
        })
      })
    }
    getProductById() : void{
      this.productsService.getProductById(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
    }
  addToCart(productId : string) : void{
    this.isLoading = true
    this.cartService.addToCart(productId)?.subscribe({
      next:(response)=>{
        this.cartService.numOfCartItems.next(response.numOfCartItems)
        this.isLoading = false
      }
    })
  }
  }
