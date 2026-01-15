import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loggedUserGuard } from './core/guards/logged-user-guard';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },

  // ===== AUTH LAYOUT (login / register) =====
  {
    path: 'auth',
    canActivate: [loggedUserGuard], // no logged-in users
    loadComponent: () =>
      import('./core/layouts/auth-layout/auth-layout.component')
        .then(m => m.AuthLayoutComponent),
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES),
  },

  // ===== MAIN LAYOUT (store) =====
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),
    children: [

      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.routes')
            .then(m => m.HOME_ROUTES),
      },

      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes')
            .then(m => m.PRODUCTS_ROUTES),
      },

      {
        path: 'details/:id/:slug?',
        loadComponent: () =>
          import('./features/products/pages/product-details/product-details.component')
            .then(m => m.ProductDetailsComponent),
      },

      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.routes')
            .then(m => m.CATEGORIES_ROUTES),
      },

      {
        path: 'brands',
        loadChildren: () =>
          import('./features/brands/brands.routes')
            .then(m => m.BRANDS_ROUTES),
      },

      // ===== AUTH ONLY PAGES =====
      {
        path: 'orders',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/orders/orders.routes')
            .then(m => m.ORDERS_ROUTES),
      },

      {
        path: 'wishlist',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/wishlist/wishlist.routes')
            .then(m => m.WISHLIST_ROUTES),
      },

      {
        path: 'payment/:cartId',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/payment/payment.routes')
            .then(m => m.PAYMENT_ROUTES),
      },
    ],
  },

  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/static-pages/not-found/not-found.component')
        .then(m => m.NotFoundComponent),
  },

  {
    path: '**',
    redirectTo: 'not-found',
  },
];
