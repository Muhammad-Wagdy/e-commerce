import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class BaseHTTP {
  protected http = inject(HttpClient);
}
