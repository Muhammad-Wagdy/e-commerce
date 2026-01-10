import { Injectable } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { HttpParams, httpResource, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IOnlinePaymentResponse } from '../interfaces/IOnlinePaymentResponse';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseHTTP{

  param = new HttpParams().append('url',environment.appUrl)

  cashPayment(userInfo : {} , cartId : string){
    return this.http.post(`${APP_APIS.PAYMENT.cash}/${cartId}`,
    {
      shippingAddress: userInfo
    },
    {
      params:this.param
    })
  }
  onlinePayment(userInfo : {} , cartId : string){
    return this.http.post<IOnlinePaymentResponse>(`${APP_APIS.PAYMENT.online}/${cartId}`,
    {
      shippingAddress: userInfo
    },
    {
      params:this.param
    })
  }
}
