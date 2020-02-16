import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient ) {}
  getAllItems = () => {
    const url = 'http://localhost:3000/items'
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }

  createItem = (params) => {
    const url = 'http://localhost:3000/items/createItem';
    return this.http.post(url, params);
  }

  updateItem = (params) => {
    const url = 'http://localhost:3000/items/updateItem';
    return this.http.post(url, params);
  }

  getItemImage = (params) => {
    const url = 'http://localhost:3000/items/item_image';
    return this.http.post(url, params);
  }

  deactivateItem = (params) => {
    console.log(params)
    const url = 'http://localhost:3000/items/deactivate';
    return this.http.post(url, params);
  }

  deleteItem = (params) => {
    const url = 'http://localhost:3000/items/delete';
    return this.http.post(url, params);
  }

  findItem = (params) => {
    const url = 'http://localhost:3000/items/findItem';
    return this.http.post(url, params);
  }

  getAllItemsWithDetails = () => {
    const url = 'http://localhost:3000/items/itemdetails'
    return this.http.get(url);
  }
}
