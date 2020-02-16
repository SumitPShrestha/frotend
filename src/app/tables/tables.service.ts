import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http: HttpClient ) {}
  public getAllTables = () => {
    const url = 'http://localhost:3000/tables'
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }

  public getEmptyTable = () => {
    const url = 'http://localhost:3000/tables/empty'
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }
}
