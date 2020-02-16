import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemsListComponent} from './items-list/items-list.component';

const routes: Routes = [
  // {
  //   path: 'create',
  //   component: CreateUserComponent
  // },
  {
    path: 'all',
    component: ItemsListComponent
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
export class ItemsRoutingModule { }
