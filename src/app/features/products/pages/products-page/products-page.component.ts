import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';

import { ProductsService } from '../../services/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { allProducts } from '../../../../core/interfaces/IAllProductsResponse';
import { SkeletonLoaderComponent } from "../../../../shared/components/skeleton-loader/skeleton-loader/skeleton-loader.component";

@Component({
  selector: 'app-products-page',
  imports: [CardProductsComponent, SectionHeaderComponent, LoadingSpinnerComponent, NgxPaginationModule, NgxSkeletonLoaderModule, SkeletonLoaderComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  public readonly productsService = inject(ProductsService);
  public readonly router = inject(Router)
  public readonly activatedRoute = inject(ActivatedRoute)
  public readonly viewportScroller = inject(ViewportScroller)
  private readonly platform = inject(PLATFORM_ID);


  page = 1
  limit = 8
  isFetching = false

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.getAllProducts();
    })
  }
  getAllProducts(): void {
    this.isFetching = true;
    this.productsService.getAllProducts(this.page, this.limit).subscribe({
      next: (response) => {
        this.productsService.allProducts = response.data;
        this.productsService.totalProducts = response.results;
        this.isFetching = false;
      },
      error: () => {
        this.isFetching = false;
      },
    });
  }

  pageChange(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    })
    if (!isPlatformBrowser(this.platform)) {
      this.viewportScroller.scrollToPosition([0, 0], {
        behavior: "smooth"
      })
    }
  }
}
