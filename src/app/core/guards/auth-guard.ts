import { AuthService } from './../../features/auth/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { STORED_KEYS } from '../constants/StoredKeys';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);

  if (!token || token.trim() === '') {
    return router.parseUrl('/auth/login');
  }

  if (!authService.isTokenValid(token)) {

    authService.clearAuthData();
    return router.parseUrl('/auth/login');
  }

  return true;
};
