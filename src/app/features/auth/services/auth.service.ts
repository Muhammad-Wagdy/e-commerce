import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseHTTP } from '../../../core/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { IAuthResponse } from '../interfaces/IAuthResponse';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEYS } from '../../../core/constants/StoredKeys';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHTTP {
  private readonly router = inject(Router);
  private storedToken: string | null = null;
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.isLoggedInSubject.asObservable();
  constructor() {
    super();
    // Initialize token from localStorage on service creation (page reload)
    this.initializeTokenFromStorage();
  }

private initializeTokenFromStorage(): void {
  if (!this.isBrowser) return;

  const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);

  if (token && token.trim() !== '') {
    const isValid = this.decodeToken(token);
    this.isLoggedInSubject.next(isValid);

    if (!isValid) {
      this.clearAuthData();
    }
  } else {
    this.isLoggedInSubject.next(false);
  }
}

  login(userData: {}) {
    return this.http.post<IAuthResponse>(APP_APIS.Auth.login, userData);
  }
  signup(userData: {}) {
    return this.http.post(APP_APIS.Auth.signUp, userData);
  }

  clearAuthData() {
      if (!this.isBrowser) return;

    localStorage.removeItem(STORED_KEYS.USER_TOKEN);
    localStorage.removeItem(STORED_KEYS.USER_ID);
    this.storedToken = null;
    this.isLoggedInSubject.next(false);
  }

  logOut() {
    this.clearAuthData();
  if (this.isBrowser) {
    this.router.navigateByUrl('/auth/login');
  }

  }
  forgetPassword(data: { email: string }) {
    return this.http.post(APP_APIS.Auth.forgetPassword, data);
  }

decodeToken(token: string): boolean {
  try {
    if (!token || token.trim() === '') return false;

    const decoded = jwtDecode(token) as { id: string; exp?: number };

    if (!decoded?.id) return false;

    if (decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) return false;
    }

    localStorage.setItem(STORED_KEYS.USER_ID, decoded.id);
    localStorage.setItem(STORED_KEYS.USER_TOKEN, token);

    this.storedToken = token;
    this.isLoggedInSubject.next(true);

    return true;
  } catch {
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
