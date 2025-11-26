import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck() {
    const token: string = localStorage.getItem('accessToken');

    if (!token) {
      _isAuthenticated = false;
      return;
    }

    // Check if it's a mock token (starts with "mock_")
    if (token.startsWith('mock_')) {
      // For mock tokens, check if it has valid format (3 parts separated by dots)
      const parts = token.split('.');
      if (parts.length === 3) {
        // Valid mock token format
        _isAuthenticated = true;
        return;
      } else {
        // Invalid mock token format, clear it
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        _isAuthenticated = false;
        return;
      }
    }

    // For real JWT tokens, use JWT helper
    let expired: boolean = true;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      // If token validation fails, consider it expired
      expired = true;
    }

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      _isAuthenticated = token != null && !expired;
    } catch (error) {
      // If token is invalid, clear it and set as not authenticated
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      _isAuthenticated = false;
    }
  }
  setAdminStatus(isAdmin: boolean) {
    _isAdmin = isAdmin;
  }
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
  get isAdminUser(): boolean {
    return _isAdmin;
  }
}

export let _isAuthenticated: boolean;
export let _isAdmin: boolean;
