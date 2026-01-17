import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../products/services/products.service';
import { allProducts } from '../../../../core/interfaces/IAllProductsResponse';
import { CardProductsComponent } from "../../../products/components/card-products/card-products.component";
import { SkeletonLoaderComponent } from "../../../../shared/components/skeleton-loader/skeleton-loader/skeleton-loader.component";

@Component({
  selector: 'app-specific-category',
  imports: [CardProductsComponent, RouterLink, SkeletonLoaderComponent],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.css',
})
export class SpecificCategoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  categoryProducts: allProducts[] = [];
  isLoading = false;
  limit = 8

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.getProductsByCategory(categoryId);
      }
    });
  }

  getProductsByCategory(categoryId: string) {
    this.isLoading = true;
    this.productsService.getProductsByCategory(categoryId).subscribe({
      next: response => {
        this.categoryProducts = response.data;
        this.isLoading = false;
      },
      error: error => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }
}
