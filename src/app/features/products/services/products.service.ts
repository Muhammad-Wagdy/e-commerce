import { ISpecificProductResponse, Product } from './../interfaces/ISpecificProductResponse';
import { Injectable } from '@angular/core';
import { allProducts, IAllProductsResponse } from '../../../core/interfaces/IAllProductsResponse';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseHTTP {
  allProducts!: allProducts[];
  productDetails!: Product;
  isFetching = false;

  totalProducts = 0;

  getAllProducts(page = 1, limit = 8): void {
    this.isFetching = true;
    this.http
      .get<IAllProductsResponse>(APP_APIS.PRODUCT.allProducts + `?page=${page}&limit=${limit}`)
      .subscribe({
        next: (response) => {
          this.allProducts = response.data;
          this.totalProducts = response.results;
          this.isFetching = false;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.isFetching = false;
        },
      });
  }

  getProductById(productId: string) {
    return this.http.get<ISpecificProductResponse>(APP_APIS.PRODUCT.allProducts + `/${productId}`).subscribe({
      next: (response) => {
        this.productDetails = response.data;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }
}
