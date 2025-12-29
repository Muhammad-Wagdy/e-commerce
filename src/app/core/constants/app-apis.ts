import { environment } from './../../../environments/environment';

export const APP_APIS = {
  PRODUCT: {
    allProducts: `${environment.baseUrl}products`,
  },
  CATEGORIES: {
    allCategories: `${environment.baseUrl}categories`,
  },
  Brands: {
    allBrands: `${environment.baseUrl}brands`,
  },
  Auth: {
    signUp: `${environment.baseUrl}auth/signup`,
    login: `${environment.baseUrl}auth/signin`,
  },
  Cart: {
    data: `${environment.baseUrl}cart`,
  },
};
