import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient ) {}
  getAllOrders = () => {
    const url = 'http://localhost:3000/orders'
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }

  getOrderDetails = (id) => {
    const url = 'http://localhost:3000/orders/orderDetails'
    return this.http.post(url, {OrderId: id});
  }

  updateOrderDetails = (params) => {
    // console.log("service " + params.getAll());
    const url = 'http://localhost:3000/orders/updateOrder';
    return this.http.post(url, {params});
  }

  deleteOrder = (id) => {
    const url = 'http://localhost:3000/orders/deleteOrder';
    return this.http.post(url, {DetailId: id});
  }

  addNewOrder = (params) => {
    const url = 'http://localhost:3000/orders/createOrder';
    return this.http.post(url, {params});
  }
}
