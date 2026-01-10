import { ISpecificProductResponse, Product } from './../interfaces/ISpecificProductResponse';
import { Injectable } from '@angular/core';
import {allProducts, IAllProductsResponse } from '../../../core/interfaces/IAllProductsResponse';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseHTTP {
  allProducts!: allProducts[];
  totalProducts = 0;


  getAllProducts(page = 1, limit = 8){
    return this.http
      .get<IAllProductsResponse>(APP_APIS.PRODUCT.allProducts + `?page=${page}&limit=${limit}`)
  }

  getProductById(productId: string) {
    return this.http.get<ISpecificProductResponse>(APP_APIS.PRODUCT.allProducts + `/${productId}`)
  }
}
