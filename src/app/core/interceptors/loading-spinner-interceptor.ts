import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, timer } from 'rxjs';

let activeRequests = 0; // Track concurrent requests

const SKIP_URLS = ['products', 'wishlist', 'cart']; // URLs where spinner is not needed
const MIN_SPINNER_TIME = 300; // Minimum display time in ms

export const loadingSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  // Skip spinner for certain URLs
  if (SKIP_URLS.some(url => req.urlWithParams.includes(url))) {
    return next(req);
  }

  activeRequests++;
  spinner.show();

  const startTime = Date.now();

  return next(req).pipe(
    finalize(() => {
      const elapsed = Date.now() - startTime;
      const remaining = MIN_SPINNER_TIME - elapsed;

      // Ensure spinner shows for at least MIN_SPINNER_TIME
      setTimeout(() => {
        activeRequests--;
        if (activeRequests === 0) {
          spinner.hide();
        }
      }, remaining > 0 ? remaining : 0);
    })
  );
};
