import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(private http: HttpClient) {}

  getAllOffers = () => {
    const url = 'http://localhost:3000/offers'
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }

  saveOffer = (params) => {
    const url = 'http://localhost:3000/offers/createOffer';
    return this.http.post(url, params);
  }

  updateOffer = (params) => {
    const url = 'http://localhost:3000/offers/updateOffer';
    return this.http.post(url, params);
  }

  deactivateOffer = (params) => {
    const url = 'http://localhost:3000/offers/deactivate';
    return this.http.post(url, params);
  }

  deleteOffer = (params) => {
    const url = 'http://localhost:3000/offers/delete';
    return this.http.post(url, params);
  }
  getCodes = () => {
    const url = 'http://localhost:3000/codes/getByType?where={"CodeType":"Offers"}';
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }
}
