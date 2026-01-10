import { Routes } from "@angular/router";

export const PAYMENT_ROUTES : Routes = [
  {
    path:'',
    loadComponent: ()=>
      import ('./pages/payment-page/payment-page.component').then((m)=>m.PaymentPageComponent)
  },
]
