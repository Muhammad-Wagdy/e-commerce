import { CanActivateFn, Router } from '@angular/router';
import { STORED_KEYS } from '../constants/StoredKeys';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const loggedUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);
  if (token) {
    return router.parseUrl('/home');
  }
  return true;
};
