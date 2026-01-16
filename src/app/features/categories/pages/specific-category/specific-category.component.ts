import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../products/services/products.service';
import { allProducts } from '../../../../core/interfaces/IAllProductsResponse';
import { CardProductsComponent } from "../../../products/components/card-products/card-products.component";
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-specific-category',
  imports: [CardProductsComponent, LoadingSpinnerComponent, RouterLink],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.css',
})
export class SpecificCategoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  categoryProducts: allProducts[] = [];
  isLoading = false;

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
