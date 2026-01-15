import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

let activeRequests = 0;
let showTimer: any = null;
let hideTimer: any = null;
let spinnerVisible = false;
let spinnerStartTime = 0;

const MIN_SPINNER_TIME = 300;  // Prevent flashing
const DEBOUNCE_TIME = 100;     // Don't show for fast requests

// URLs that should NOT show spinner
const SPINNER_BLACKLIST = [
  ''
];

export const loadingSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  // Skip spinner for blacklisted URLs
  const shouldSkip = SPINNER_BLACKLIST.some(url => req.url.includes('products') || req.url.includes('wishlist') || req.url.includes('cart'));
  if (shouldSkip) {
    return next(req);
  }

  activeRequests++;

  // Show spinner with debounce on first request
  if (activeRequests === 1 && !spinnerVisible) {
    if (showTimer) clearTimeout(showTimer);

    showTimer = setTimeout(() => {
      spinner.show();
      spinnerVisible = true;
      spinnerStartTime = Date.now();
    }, DEBOUNCE_TIME);
  }

  // Cancel any pending hide if new request arrives
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }

  return next(req).pipe(
    finalize(() => {
      activeRequests--;

      // Hide spinner when all requests complete
      if (activeRequests === 0) {
        const elapsed = Date.now() - spinnerStartTime;
        const remaining = Math.max(MIN_SPINNER_TIME - elapsed, 0);

        if (hideTimer) clearTimeout(hideTimer);

        hideTimer = setTimeout(() => {
          // Clear show timer in case request finished before debounce
          if (showTimer) {
            clearTimeout(showTimer);
            showTimer = null;
          }

          spinner.hide();
          spinnerVisible = false;
          spinnerStartTime = 0;
        }, remaining);
      }
    })
  );
};
