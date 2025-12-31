import { Injectable } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { Brand, IAllBrandsResponse } from '../interfaces/IAllBrandsResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandsService extends BaseHTTP {
  allBrands!: Brand[];

  getAllBrands(): void {
    this.http.get<IAllBrandsResponse>(APP_APIS.BRANDS.allBrands).subscribe({
      next: (response) => {
        this.allBrands = response.data;
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      },
    });
  }
}
