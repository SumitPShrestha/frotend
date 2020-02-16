import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {

  constructor(private http: HttpClient ) {}
  getItemCategories = () => {
    const url = 'http://localhost:3000/itemcategories'
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }
}
