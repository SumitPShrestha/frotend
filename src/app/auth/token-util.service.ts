import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from './credentials.model';
import { HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenUtilService {

  jwtHelper: JwtHelperService;

  currentUser: Credentials;

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  storeToken = (user: Credentials) => {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  setTokenHeader = (request: HttpRequest<any>) => {
    return request.clone({
      setHeaders: {
        'x-auth-header': this.currentUser.token
      }
    });
  }
  isTokenExpired = () => {
    const token = this.currentUser.token;
    return this.jwtHelper.isTokenExpired(token);
  }
}
