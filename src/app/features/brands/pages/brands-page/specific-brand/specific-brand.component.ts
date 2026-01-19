import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../../products/services/products.service';
import { allProducts } from '../../../../../core/interfaces/IAllProductsResponse';
import { CardProductsComponent } from "../../../../products/components/card-products/card-products.component";
import { SkeletonLoaderComponent } from "../../../../../shared/components/skeleton-loader/skeleton-loader/skeleton-loader.component";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-specific-brand',
  imports: [CardProductsComponent, RouterLink, SkeletonLoaderComponent],
  templateUrl: './specific-brand.component.html',
  styleUrl: './specific-brand.component.css',
})
export class SpecificBrandComponent {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private viewportScroller = inject(ViewportScroller);

  brandProducts: allProducts[] = [];
  isLoading = false;

  get brandName(): string {
  return this.brandProducts.length > 0 && this.brandProducts[0]?.brand?.name
    ? this.brandProducts[0].brand.name
    : 'Brand';
}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const brandId = params.get('id');
      if (brandId) {
        this.getProductsByBrand(brandId);
      }
    });
    this.viewportScroller.scrollToPosition([0,0],{
      behavior:'smooth'
    })
  }

  getProductsByBrand(brandId: string) {
    this.isLoading = true;
    this.productsService.getProductsByBrand(brandId).subscribe({
      next: response => {
        this.brandProducts = response.data;
        this.isLoading = false;
      },
      error: error => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }
}
