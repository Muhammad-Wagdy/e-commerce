import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { CardProductsComponent } from "../card-products/card-products.component";
import { SkeletonLoaderComponent } from "../../../../shared/components/skeleton-loader/skeleton-loader/skeleton-loader.component";

@Component({
  selector: 'app-related-products',
  imports: [SectionHeaderComponent, CardProductsComponent, SkeletonLoaderComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent implements OnInit {
  public readonly productsService = inject(ProductsService);
  public readonly router = inject(Router)
  public readonly activatedRoute = inject(ActivatedRoute)
  public readonly viewportScroller = inject(ViewportScroller)
  public readonly platform = inject(PLATFORM_ID)


  page = 1
  limit = 8

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.page = +params['id'] || 1;
      this.getAllProducts();
      if (isPlatformBrowser(this.platform)) {
        this.viewportScroller.scrollToPosition([0,0],{
          behavior:'smooth'
        })
      }

    })
  }
  getAllProducts() : void {
    this.productsService.getAllProducts(this.page,this.limit)
  }

}
