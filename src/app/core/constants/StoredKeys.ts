import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const STORED_KEYS = {
  USER_TOKEN: 'USER_TOKEN',
  USER_ID: 'USER_ID',
};

export function initializeStoredKeys() {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    const existingToken = localStorage.getItem(STORED_KEYS.USER_TOKEN);
    if (!existingToken) {
      localStorage.setItem(STORED_KEYS.USER_TOKEN, '');
    }
  }
}
