import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { STORED_KEYS } from '../constants/StoredKeys';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID)

  if (!req.urlWithParams.includes('cart') && !req.urlWithParams.includes('orders')) return next(req);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem(STORED_KEYS.USER_TOKEN)

    if (token) {
      req = req.clone({
        setHeaders:{
          token
        }
      })
    }
  }
  return next(req);
};
