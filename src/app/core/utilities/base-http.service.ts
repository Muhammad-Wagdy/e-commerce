import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export class BaseHTTP {
  protected http = inject(HttpClient);
    protected platformId = inject(PLATFORM_ID);

  protected get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
