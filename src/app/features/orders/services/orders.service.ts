import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { STORED_KEYS } from '../../../core/constants/StoredKeys';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { IAllOrdersResponse } from '../interfaces/IAllOrdersResponse';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BaseHTTP{
  private readonly platform = inject(PLATFORM_ID)

  userOrders!: IAllOrdersResponse[]

  getUserOrders(): Observable<IAllOrdersResponse[] | null> {
    if (isPlatformBrowser(this.platform)) {
      const userID = localStorage.getItem(STORED_KEYS.USER_ID);

      if (!userID) {
        return of(null);
      }

      return this.http.get<IAllOrdersResponse[]>(
        `${APP_APIS.ORDERS.orders}/${userID}`
      );
    }

    return of(null);
  }
}
