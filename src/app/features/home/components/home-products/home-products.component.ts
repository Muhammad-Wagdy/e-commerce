import { Component, inject, OnInit } from '@angular/core';
import { CardProductsComponent } from '../../../products/components/card-products/card-products.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ProductsService } from '../../../products/services/products.service';
import { SkeletonLoaderComponent } from "../../../../shared/components/skeleton-loader/skeleton-loader/skeleton-loader.component";

@Component({
  selector: 'app-home-products',
  imports: [CardProductsComponent, SectionHeaderComponent, SkeletonLoaderComponent],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css',
})
export class HomeProductsComponent implements OnInit {
  public readonly productsService = inject(ProductsService);

  limit = 8

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.productsService.allProducts = response.data;
        this.productsService.totalProducts = response.results;
      },
      error: () => {
      },
    });;
  }
}
