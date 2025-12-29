import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Component, OnInit, inject } from '@angular/core';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';

import { ProductsService } from '../../services/products.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-products-page',
  imports: [CardProductsComponent, SectionHeaderComponent, LoadingSpinnerComponent, NgxPaginationModule,NgxSkeletonLoaderModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  public readonly productsService = inject(ProductsService);
  public readonly router = inject(Router)
  public readonly activatedRoute = inject(ActivatedRoute)
  public readonly viewportScroller = inject(ViewportScroller)

  page = 1
  limit = 8

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.page = +params['page'] || 1;
      this.getAllProducts();
    })
  }
  getAllProducts() : void {
    this.productsService.getAllProducts(this.page,this.limit)
  }

  pageChange(page : number) : void {
    this.router.navigate([],{
      queryParams:{page},
      queryParamsHandling:'merge'
    })
    this.viewportScroller.scrollToPosition([0,0],{
      behavior:"smooth"
    })
  }
}
