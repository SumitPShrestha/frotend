import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Credentials } from './credentials.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  loggedIn: boolean;
  helper: JwtHelperService;
  public loginEvent: EventEmitter<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.loginEvent = new EventEmitter<boolean>();
    this.helper = new JwtHelperService();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }


  doLogin = (credentials: any) => {
    return this.http.post('http://localhost:3000/auth/login', credentials)
      .pipe(map((user: Credentials) => {
        this.loginEvent.emit(true);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));

  }

  isTokenExpired = () => {
    const token = this.currentUserValue.token.split(':')[0];
    return this.helper.isTokenExpired(token);
  }

  killSession = () => {
    this.logout();
  }


  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loggedIn = false;
    this.router.navigate(['auth']);
  }

}
