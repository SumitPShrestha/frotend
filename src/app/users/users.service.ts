import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers = () => {
    const url = 'http://localhost:3000/users'
   /*  if (filterParam) {
      filterParam = JSON.stringify(filterParam);
      url = url + '?' + filterParam;
    } */
    return this.http.get(url);
  }

  getRoles = () => {
    const url = 'http://localhost:3000/roles'
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }
  getUserRoles = () => {
    const url = 'http://localhost:3000/ItemRate'
    /*  if (filterParam) {
       filterParam = JSON.stringify(filterParam);
       url = url + '?' + filterParam;
     } */
    return this.http.get(url);
  }
  saveUser = (params) => {
    const url = 'http://localhost:3000/users/createUser';
    return this.http.post(url, params);
  }
  updateUser = (params) => {
    const url = 'http://localhost:3000/users/updateUser';
    return this.http.post(url, params);
  }
  deactivateUser = (params) => {
    const url = 'http://localhost:3000/users/deactivate';
    return this.http.post(url, params);
  }

  deleteUser = (params) => {
    const url = 'http://localhost:3000/users/delete';
    return this.http.post(url, params);
  }
}
