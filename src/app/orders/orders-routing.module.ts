import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrdersListComponent} from './orders-list/orders-list.component';

const routes: Routes = [
  {
    path: 'all',
    component: OrdersListComponent
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
