import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenu = () => {
    return this.http.get('http://localhost:3000/menu').pipe(map(menu => {
      return menu;
    }, error => {
      console.log(error);
    }))
  }
  geTodaysSpecial = () => {
    return this.http.get('http://localhost:3000/menu/todays-special').pipe(map(menu => {
      return menu;
    }, error => {
      console.log(error);
    }))
  }
}
