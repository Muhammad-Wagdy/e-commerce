import { Injectable } from '@angular/core';
import { IAllCategoriesResponse, ICategory } from '../interfaces/IAllCategoriesResponse';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseHTTP {
  allCategories!: ICategory[];
  getAllCategories() {
    this.http
      .get<IAllCategoriesResponse>(APP_APIS.CATEGORIES.allCategories)
      .subscribe({
        next: (response) => {
          this.allCategories = response.data;
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      });
  }
}
