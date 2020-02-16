import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TablesListComponent} from './tables-list/tables-list.component';

const routes: Routes = [
  {
    path: 'all',
    component: TablesListComponent
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
export class TablesRoutingModule { }
