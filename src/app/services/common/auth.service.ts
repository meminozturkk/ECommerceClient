import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  identityCheck() {
    const token: string = localStorage.getItem('accessToken');

    //const decodeToken = this.jwtHelper.decodeToken(token);
    //const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }
    debugger;
    const decodedToken = this.jwtHelper.decodeToken(token);

    _isAuthenticated = token != null && !expired;
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
