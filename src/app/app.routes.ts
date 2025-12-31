import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { BRANDS_ROUTES } from './features/brands/brands.routes';
import { CATEGORIES_ROUTES } from './features/categories/categories.routes';
import { HOME_ROUTES } from './features/home/home.routes';
import { PRODUCTS_ROUTES } from './features/products/products.routes';
import { authGuard } from './core/guards/auth-guard';
import { loggedUserGuard } from './core/guards/logged-user-guard';
import { CART_ROUTES } from './features/cart/cart.routes';

export const routes: Routes = [
  //Auth - only for logged out users
  {
    path: '',
    canActivate: [loggedUserGuard],
    component: AuthLayoutComponent,
    children: AUTH_ROUTES,
  },
  //User - only for logged in users
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        children: HOME_ROUTES,
      },
      {
        path: 'products',
        children: PRODUCTS_ROUTES,
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/products/pages/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
      },
      {
        path: 'details/:id/:slug',
        loadComponent: () =>
          import('./features/products/pages/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
      },
      {
        path: 'categories',
        children: CATEGORIES_ROUTES,
      },
      {
        path: 'brands',
        children: BRANDS_ROUTES,
      },
      {
        path: 'cart',
        children: CART_ROUTES,
      },
    ],
  },
  //not-found
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/static-pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
