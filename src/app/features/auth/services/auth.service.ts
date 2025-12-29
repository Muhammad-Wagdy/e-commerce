import { inject, Injectable } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEYS } from '../../../core/constants/StoredKeys';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHTTP {
  private readonly router = inject(Router);
  private storedToken: string | null = null;
  login(userData: {}) {
    return this.http.post<IAuthResponse>(APP_APIS.Auth.login, userData);
  }
  signup(userData: {}) {
    return this.http.post(APP_APIS.Auth.signUp, userData);
  }

  logOut() {
    localStorage.clear();
    this.storedToken = null;
    this.router.navigate(['/login']);
  }
  forgetPassword(data: { email: string }) {
    return this.http.post('/forget-password', data);
  }

  decodeToken(token: string): boolean {
    try {
      const decoded = jwtDecode(token) as { id: string; exp?: number; email: string };

      if (!decoded?.id || !decoded?.email) {
        return false;
      }

      if (decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          this.logOut();
          return false;
        }
      }

      localStorage.setItem(STORED_KEYS.USER_ID, decoded.id);
      this.storedToken = token;
      return true;
    } catch (error) {
      this.logOut();
      return false;
    }
  }

  setToken(token: string) {
    this.storedToken = token;
  }
  isTokenValid(token: string): boolean {
    if (!token) {
      return false;
    }

    if (!this.storedToken) {
      return this.decodeToken(token);
    }
    if (token !== this.storedToken) {
      return this.decodeToken(token);
    }

    return true;
  }
}
