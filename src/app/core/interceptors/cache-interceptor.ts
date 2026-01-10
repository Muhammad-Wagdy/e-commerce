import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface CacheEntry {
  response: HttpResponse<any>;
  expired: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 2 * 60 * 1000; // 10 mins (fixed: was 10000ms)
const MAX_CACHE_SIZE = 100; // Prevent unlimited memory growth

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') return next(req);

  // Skip caching for specific patterns
  const skipCachePatterns = ['cart', 'auth', 'login', 'logout'];
  if (skipCachePatterns.some(pattern => req.urlWithParams.includes(pattern))) {
    return next(req);
  }

  // Check for cache control headers that prevent caching
  if (req.headers.has('Cache-Control') &&
      req.headers.get('Cache-Control')?.includes('no-cache')) {
    return next(req);
  }

  const cacheKey = req.urlWithParams;
  const cached = cache.get(cacheKey);

  // Return cached response if valid
  if (cached && cached.expired > Date.now()) {
    return of(cached.response.clone());
  }

  // Remove expired entry if exists
  if (cached) {
    cache.delete(cacheKey);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        // Only cache successful responses (200-299)
        if (event.status >= 200 && event.status < 300) {
          // Implement LRU-style cache eviction
          if (cache.size >= MAX_CACHE_SIZE) {
            const firstKey = cache.keys().next().value;
            if (firstKey !== undefined) {
              cache.delete(firstKey);
            }
          }

          cache.set(cacheKey, {
            response: event.clone(),
            expired: Date.now() + CACHE_DURATION
          });
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      // Don't cache error responses
      cache.delete(cacheKey);
      return throwError(() => error);
    })
  );
};

// Optional: Export cache management utilities
export const clearCache = () => cache.clear();
export const removeCacheEntry = (url: string) => cache.delete(url);
export const getCacheSize = () => cache.size;
