import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryTypeService {

  constructor(private http: HttpClient ) {}
  getCategoryTypes = () => {
    const url = 'http://localhost:3000/categorytypes'
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }
  saveCatType = (params) => {
    const url = 'http://localhost:3000/categorytypes/createCategoryType';
    return this.http.post(url, params);
  }
  updateCatType = (params) => {
    const url = 'http://localhost:3000/categorytypes/updateCategorytype';
    return this.http.post(url, params);
  }
  deactivateCatType = (params) => {
    const url = 'http://localhost:3000/categorytypes/deactivate';
    return this.http.post(url, params);
  }
  deleteCatType = (params) => {
    const url = 'http://localhost:3000/categorytypes/delete';
    return this.http.post(url, params);
  }
}
