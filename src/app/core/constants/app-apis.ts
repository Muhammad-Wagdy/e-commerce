import { environment } from './../../../environments/environment';

export const APP_APIS = {
  PRODUCT: {
    allProducts: `${environment.baseUrl}products`,
  },
  CATEGORIES: {
    allCategories: `${environment.baseUrl}categories`,
  },
  BRANDS: {
    allBrands: `${environment.baseUrl}brands`,
  },
  Auth: {
    signUp: `${environment.baseUrl}auth/signup`,
    login: `${environment.baseUrl}auth/signin`,
    forgetPassword: `${environment.baseUrl}auth/forgotPasswords`,
  },
  Cart: {
    data: `${environment.baseUrl}cart`,
  },
  ORDERS: {
    orders: `${environment.baseUrl}orders/user`,
  },
  PAYMENT: {
    cash: `${environment.baseUrl}orders`,
    online: `${environment.baseUrl}orders/checkout-session`,
  },
};
