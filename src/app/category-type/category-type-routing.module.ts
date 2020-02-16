import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from '../users/user-list/user-list.component';
import {CategoryTypeListComponent} from './category-type-list/category-type-list.component';

const routes: Routes = [
  {
    path: 'all',
    component: CategoryTypeListComponent
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
export class CategoryTypeRoutingModule { }
