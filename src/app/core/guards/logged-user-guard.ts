import { CanActivateFn, Router } from '@angular/router';
import { STORED_KEYS } from '../constants/StoredKeys';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../features/auth/services/auth.service';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);

  // Check if token exists and is not empty
  if (!token || token.trim() === '') {
    return true; // Allow access to auth pages
  }

  // Validate token - if valid, redirect to home
  if (authService.isTokenValid(token)) {
    return router.parseUrl('/home');
  }


  // Token exists but is invalid - clear it and allow access to auth pages
  authService.clearAuthData();
  return true;
};
