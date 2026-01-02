import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEYS } from '../../../core/constants/StoredKeys';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHTTP {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private storedToken: string | null = null;

  constructor() {
    super();
    // Initialize token from localStorage on service creation (page reload)
    this.initializeTokenFromStorage();
  }

  private initializeTokenFromStorage(): void {
    // Only access localStorage in browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);
    if (token && token.trim() !== '') {
      // Validate and set the token (decodeToken already sets storedToken if valid)
      if (!this.decodeToken(token)) {
        // Token is invalid, clear it
        this.clearAuthData();
      }
    }
  }
  login(userData: {}) {
    return this.http.post<IAuthResponse>(APP_APIS.Auth.login, userData);
  }
  signup(userData: {}) {
    return this.http.post(APP_APIS.Auth.signUp, userData);
  }

  clearAuthData() {
    localStorage.removeItem(STORED_KEYS.USER_TOKEN);
    localStorage.removeItem(STORED_KEYS.USER_ID);
    this.storedToken = null;
  }

  logOut() {
    this.clearAuthData();
    this.router.navigateByUrl('/auth/login');
  }
  forgetPassword(data: { email: string }) {
    return this.http.post(APP_APIS.Auth.forgetPassword, data);
  }

  decodeToken(token: string): boolean {
    try {
      // Check for empty token
      if (!token || token.trim() === '') {
        return false;
      }

      const decoded = jwtDecode(token) as { id: string; exp?: number; email: string };
      if (!decoded?.id) {
        return false;
      }

      if (decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          return false;
        }
      }

      localStorage.setItem(STORED_KEYS.USER_ID, decoded.id);
      localStorage.setItem(STORED_KEYS.USER_TOKEN,token);
      this.storedToken = token;
      return true;
    } catch (error) {
      return false;
    }
  }
  setToken(token: string) {
    this.storedToken = token;
  }
  isTokenValid(token: string): boolean {
    // Check for empty or invalid token
    if (!token || token.trim() === '') {
      return false;
    }

    // If storedToken is null (page reload), decode and validate the token
    if (!this.storedToken) {
      return this.decodeToken(token);
    }

    // If token changed, decode and validate the new token
    if (token !== this.storedToken) {
      return this.decodeToken(token);
    }

    // Token is already validated and stored
    return true;
  }
}
