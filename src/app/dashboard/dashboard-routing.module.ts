import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemCategoryListComponent} from '../item-category/item-category-list/item-category-list.component';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: 'all',
    component: DashboardComponent
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
export class DashboardRoutingModule { }
